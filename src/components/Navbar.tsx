import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-brand-primary/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-widest text-neon">
          TRIARCHIA
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider">
          <Link href="/" className="hover:text-neon-purple transition-colors">Home</Link>
          <Link href="/products" className="hover:text-neon-purple transition-colors">Products</Link>
          <Link href="/categories" className="hover:text-neon-purple transition-colors">Categories</Link>
          <Link href="/about" className="hover:text-neon-purple transition-colors">About</Link>
        </div>
        <div className="flex space-x-6 items-center">
          <button className="hover:text-neon-green transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>


        </div>
      </div>
    </nav>
  );
}
