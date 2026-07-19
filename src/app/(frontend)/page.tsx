import Link from "next/link";
import prisma from "@/lib/prisma";



export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { is_featured: true, status: 'Aktif' },
    include: { images: true },
    take: 8
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand-secondary">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/30 to-brand-primary z-10" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white uppercase">
            Define The <br/> <span className="text-neon animate-glow">Future</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto font-light">
            Cyber luxury streetwear designed for the modern dystopian era. Stand out in the dark.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn-neon">
              SHOP COLLECTION
            </Link>
            <Link href="/categories" className="px-6 py-3 font-semibold text-white border border-gray-600 rounded hover:bg-gray-800 transition-colors">
              EXPLORE
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-widest text-neon uppercase mb-2">Featured Drops</h2>
            <div className="w-24 h-1 bg-neon-purple mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((p) => {
                const primaryImage = p.images.find(img => img.is_primary)?.image_path || p.images[0]?.image_path || '/placeholder.png';
                return (
                  <Link href={`/products/${p.slug}`} key={p.id} className="card-luxury block group">
                    <div className="relative h-[400px] bg-brand-secondary overflow-hidden">
                      <img 
                        src={primaryImage} 
                        alt={p.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                      />
                      {p.is_new && (
                        <div className="absolute top-4 left-4 bg-neon-purple text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">New</div>
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
                No featured products yet.
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn-neon inline-flex">
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
