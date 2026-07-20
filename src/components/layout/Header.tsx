import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-orange-500">
            Daraz
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          </nav>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative group">
            <input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/wishlist" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
            Wishlist
          </Link>
          <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
            Cart
          </Link>
          <div className="h-4 w-px bg-gray-700 hidden sm:block"></div>
          <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
