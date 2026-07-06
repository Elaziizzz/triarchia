import prisma from "@/lib/prisma";
import ProductForm from "./ProductForm";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();
  
  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
      </div>
      
      <ProductForm categories={categories} />
    </div>
  );
}
