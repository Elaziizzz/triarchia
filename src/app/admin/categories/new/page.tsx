'use client';

import { createCategory } from "@/actions/admin";
import Link from "next/link";
import { useState } from "react";

export default function NewCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createCategory(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Category</h2>
        <Link href="/admin/categories" className="text-text-muted hover:text-white transition-colors">
          Cancel
        </Link>
      </div>

      <div className="bg-brand-secondary rounded-lg border border-gray-800 p-6">
        <form action={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">{error}</div>}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              className="w-full bg-brand-primary border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-neon-purple"
              placeholder="e.g. Outerwear"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-neon w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SAVING..." : "SAVE CATEGORY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
