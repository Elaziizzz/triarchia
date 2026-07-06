import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="bg-brand-primary min-h-screen">
      <section className="pt-24 pb-12 bg-brand-secondary border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase mb-4">Categories</h1>
          <p className="text-text-muted">Explore collections by category.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((c) => (
              <Link href={`/products?category=${c.slug}`} key={c.id} className="card-luxury block p-12 text-center group">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">{c.name}</h3>
                <p className="text-text-muted text-sm">{c._count.products} Products</p>
              </Link>
            ))}
            {categories.length === 0 && (
              <div className="col-span-full text-center text-text-muted">No categories found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
