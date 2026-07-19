import prisma from "@/lib/prisma";



export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const categoriesCount = await prisma.category.count();
  const usersCount = await prisma.user.count();

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-brand-secondary p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Products</h3>
          <div className="text-3xl font-bold text-white">{productsCount}</div>
        </div>
        <div className="bg-brand-secondary p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Orders</h3>
          <div className="text-3xl font-bold text-white">{ordersCount}</div>
        </div>
        <div className="bg-brand-secondary p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Categories</h3>
          <div className="text-3xl font-bold text-white">{categoriesCount}</div>
        </div>
        <div className="bg-brand-secondary p-6 rounded-lg border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Customers</h3>
          <div className="text-3xl font-bold text-white">{usersCount}</div>
        </div>
      </div>

      <div className="bg-brand-secondary p-6 rounded-lg border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
        <div className="text-gray-400 text-center py-8">
          No recent orders to display.
        </div>
      </div>
    </div>
  );
}
