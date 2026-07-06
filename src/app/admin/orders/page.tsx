import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { created_at: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Orders Management</h2>
      </div>

      <div className="bg-brand-secondary rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-800 text-gray-300 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Order Number</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-primary transition-colors">
                <td className="px-6 py-4 font-bold text-neon-purple">{o.order_number}</td>
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{o.name}</div>
                  <div className="text-xs text-gray-500">{o.email}</div>
                </td>
                <td className="px-6 py-4 font-mono text-neon-green">Rp {Number(o.total_amount).toLocaleString('id-ID')}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    o.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                    o.status === 'Lunas' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4">{o.created_at.toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300">View</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
