'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return { error: "Name is required" };

  try {
    await prisma.category.create({
      data: {
        name,
        slug: slugify(name),
      }
    });
  } catch (error: any) {
    return { error: `Failed to create category: ${error.message || error}` };
  }

  revalidatePath('/', 'layout');
  redirect('/admin/categories');
}

export async function createProduct(formData: FormData, imageUrls: string[]) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const categoryId = Number(formData.get('category_id'));
  const description = formData.get('description') as string;
  const stock = Number(formData.get('stock') || 0);
  const isFeatured = formData.get('is_featured') === 'on';

  if (!name || !price || !categoryId) return { error: "Name, price, and category are required" };

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        price,
        category_id: categoryId,
        description,
        stock,
        is_featured: isFeatured,
        status: 'Aktif',
      }
    });

    // Create images
    if (imageUrls.length > 0) {
      const imagePromises = imageUrls.map((url, index) => {
        return prisma.productImage.create({
          data: {
            product_id: product.id,
            image_path: url,
            is_primary: index === 0
          }
        });
      });
      await Promise.all(imagePromises);
    }
    
  } catch (error: any) {
    return { error: `Failed to create product: ${error.message || error}` };
  }

  revalidatePath('/', 'layout');
  redirect('/admin/products');
}
