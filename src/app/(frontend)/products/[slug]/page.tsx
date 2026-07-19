import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrderButton from "@/components/OrderButton";



export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { images: true, category: true, variants: true }
  });

  if (!product) {
    notFound();
  }

  const primaryImage = product.images.find(img => img.is_primary)?.image_path || product.images[0]?.image_path || '/placeholder.png';

  return (
    <div className="bg-brand-primary min-h-screen py-12">
      <div className="container mx-auto px-4 mt-8">
        <Link href="/products" className="text-text-muted hover:text-neon-green transition-colors inline-flex items-center gap-2 mb-8 text-sm uppercase tracking-widest">
          ← Back to Catalog
        </Link>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Images Section */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-brand-secondary rounded-lg overflow-hidden border border-gray-800">
              <img src={primaryImage} alt={product.name} className="w-full h-full object-cover object-center" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                {product.images.map((img) => (
                  <button key={img.id} className="relative w-20 h-24 flex-shrink-0 border border-gray-700 hover:border-neon-purple overflow-hidden">
                    <img src={img.image_path} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2">
            {product.category && (
              <span className="text-neon-purple text-xs font-bold uppercase tracking-widest block mb-2">{product.category.name}</span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
            <div className="text-2xl font-mono text-neon-green mb-8">
              Rp {Number(product.price).toLocaleString('id-ID')}
            </div>

            <div className="mb-8">
              <p className="text-text-muted leading-relaxed whitespace-pre-line">
                {product.description || "No description available."}
              </p>
            </div>

            <hr className="border-gray-800 my-8" />
            <OrderButton 
              productName={product.name} 
              price={Number(product.price)} 
              variants={product.variants.map(v => ({...v, additional_price: Number(v.additional_price)}))} 
              adminPhone={process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "6281234567890"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
