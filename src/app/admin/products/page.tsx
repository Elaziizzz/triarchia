import Link from "next/link";
import prisma from "@/lib/prisma";



export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { created_at: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Products Management</h2>
        <Link href="/admin/products/new" className="btn-neon px-4 py-2 text-sm text-center inline-block">
          Add New Product
        </Link>
      </div>

      <div className="bg-brand-secondary rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-800 text-gray-300 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-brand-primary transition-colors">
                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                <td className="px-6 py-4">{product.category?.name || '-'}</td>
                <td className="px-6 py-4 font-mono text-neon-green">Rp {Number(product.price).toLocaleString('id-ID')}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.status === 'Aktif' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-blue-400 hover:text-blue-300 mr-4">Edit</Link>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
