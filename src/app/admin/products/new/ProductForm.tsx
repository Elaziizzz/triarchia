'use client';

import { createProduct } from "@/actions/admin";
import Link from "next/link";
import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

type Category = { id: number; name: string };

export default function ProductForm({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  const hasCloudinary = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    // Fallback if cloudinary isn't ready: let user type URL
    const manualUrl = formData.get('manual_image_url') as string;
    let finalImages = [...imageUrls];
    if (manualUrl && !finalImages.includes(manualUrl)) {
      finalImages.push(manualUrl);
    }
    
    const result = await createProduct(formData, finalImages);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-brand-secondary rounded-lg border border-gray-800 p-6">
      <form action={handleSubmit} className="space-y-6">
        {error && <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
            <input type="text" name="name" required className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select name="category_id" required className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white">
              <option value="">Select a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Price (Rp)</label>
            <input type="number" name="price" required min="0" className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
            <input type="number" name="stock" required min="0" defaultValue="0" className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea name="description" rows={4} className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white"></textarea>
        </div>
        
        <div className="flex items-center gap-3">
          <input type="checkbox" name="is_featured" id="is_featured" className="w-4 h-4 bg-brand-primary border-gray-700 rounded text-neon-purple focus:ring-neon-purple" />
          <label htmlFor="is_featured" className="text-sm font-medium text-gray-300">Feature this product on homepage</label>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-bold text-white mb-4">Product Images</h3>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative w-24 h-24 border border-gray-700 rounded overflow-hidden">
                <img src={url} alt="upload preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {hasCloudinary ? (
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "triarchia_preset"}
              onSuccess={(result: any) => {
                setImageUrls(prev => [...prev, result.info.secure_url]);
              }}
            >
              {({ open }) => (
                <button type="button" onClick={() => open()} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
          ) : (
            <div>
              <p className="text-yellow-500 text-sm mb-2">Cloudinary is not configured yet. You can paste an image URL manually for now:</p>
              <input type="url" name="manual_image_url" placeholder="https://example.com/image.jpg" className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white" />
            </div>
          )}
        </div>

        <div className="pt-6 flex gap-4">
          <Link href="/admin/products" className="px-6 py-3 border border-gray-700 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="btn-neon flex-1 disabled:opacity-50">
            {loading ? "SAVING..." : "SAVE PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
}
