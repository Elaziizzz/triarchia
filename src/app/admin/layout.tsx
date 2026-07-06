import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-brand-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-secondary border-r border-gray-800 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <Link href="/admin" className="text-xl font-bold tracking-widest text-neon">
            TRIARCHIA <span className="text-white text-xs">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                Orders
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
            View Live Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-brand-secondary border-b border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-4">admin@example.com</span>
            <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-primary p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
