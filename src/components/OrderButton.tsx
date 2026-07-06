'use client';

import { useState } from 'react';

type Variant = {
  id: string;
  size: string;
  color: string;
  additional_price: number | string | null;
};

export default function OrderButton({ 
  productName, 
  price, 
  variants, 
  adminPhone 
}: { 
  productName: string;
  price: number;
  variants: Variant[];
  adminPhone: string;
}) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(variants.length > 0 ? variants[0] : null);

  const handleOrder = () => {
    let message = `Halo admin, saya mau pesan:\n*${productName}*\n`;
    let finalPrice = price;

    if (selectedVariant) {
      message += `Varian: ${selectedVariant.color} - ${selectedVariant.size}\n`;
      if (selectedVariant.additional_price && Number(selectedVariant.additional_price) > 0) {
        finalPrice += Number(selectedVariant.additional_price);
      }
    }
    
    message += `\nHarga: Rp ${finalPrice.toLocaleString('id-ID')}\n\nApakah stoknya masih ada?`;
    
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {variants.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Pilih Varian</h4>
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <button 
                key={v.id} 
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 border rounded text-sm transition-colors ${
                  selectedVariant?.id === v.id 
                    ? 'border-neon-green text-neon-green bg-neon-green/10' 
                    : 'border-gray-700 text-text-muted hover:border-neon-purple hover:text-white'
                }`}
              >
                {v.color} - {v.size} {v.additional_price && Number(v.additional_price) > 0 ? `(+Rp ${Number(v.additional_price).toLocaleString('id-ID')})` : ''}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-4">
        <button onClick={handleOrder} className="btn-neon w-full py-4 text-lg">
          PESAN VIA WHATSAPP
        </button>
      </div>
    </div>
  );
}
