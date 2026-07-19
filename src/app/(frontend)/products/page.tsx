import Link from "next/link";
import prisma from "@/lib/prisma";



export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { status: 'Aktif' },
    include: { images: true, category: true },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="bg-brand-primary min-h-screen">
      <section className="pt-24 pb-12 bg-brand-secondary border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase mb-4">The Collection</h1>
          <p className="text-text-muted">Browse our entire catalog of premium cyber streetwear.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((p) => {
                const primaryImage = p.images.find(img => img.is_primary)?.image_path || p.images[0]?.image_path || '/placeholder.png';
                return (
                  <Link href={`/products/${p.slug}`} key={p.id} className="card-luxury block group">
                    <div className="relative h-[350px] bg-brand-secondary overflow-hidden">
                      <img 
                        src={primaryImage} 
                        alt={p.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                      />
                      {p.category && (
                        <div className="absolute bottom-4 left-4 bg-brand-primary/80 backdrop-blur-sm border border-gray-700 text-text-muted text-[10px] font-bold px-3 py-1 uppercase rounded-sm">
                          {p.category.name}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 truncate text-white group-hover:text-neon-green transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-neon-purple font-mono">Rp {Number(p.price).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center text-text-muted py-12">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
