import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-secondary border-t border-gray-800 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold tracking-widest text-neon mb-4">TRIARCHIA</h3>
          <p className="text-sm text-text-muted">
            Premium cyber luxury clothing for the modern era. Experience the future of fashion.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link href="/" className="hover:text-neon-purple transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-neon-purple transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-neon-purple transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-neon-purple transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link href="/faq" className="hover:text-neon-purple transition">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-neon-purple transition">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-neon-purple transition">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-text-muted mb-4">Subscribe for early access to drops.</p>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="bg-brand-primary border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:border-neon-purple" />
            <button className="bg-neon-purple text-white px-4 py-2 font-bold hover:bg-opacity-80 transition">JOIN</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} TRIARCHIA. All rights reserved.
      </div>
    </footer>
  );
}
