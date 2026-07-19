import prisma from "@/lib/prisma";
import Link from "next/link";



export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Categories Management</h2>
        <Link href="/admin/categories/new" className="btn-neon px-4 py-2 text-sm text-center inline-block">
          Add New Category
        </Link>
      </div>

      <div className="bg-brand-secondary rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-800 text-gray-300 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Total Products</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-brand-primary transition-colors">
                <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                <td className="px-6 py-4">{c.slug}</td>
                <td className="px-6 py-4 font-mono text-neon-green">{c._count.products}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
