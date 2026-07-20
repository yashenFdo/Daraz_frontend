"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { isAuthenticated } = useAuth();

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
          <form action="/search" method="GET" className="relative group">
            <input 
              type="search" 
              name="q"
              placeholder="Search for products..." 
              className="w-full bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/wishlist" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
            Wishlist
          </Link>
          <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
            Cart
          </Link>
          <div className="h-4 w-px bg-gray-700 hidden sm:block"></div>
          {isAuthenticated ? (
            <Link href="/account" className="text-orange-500 hover:text-orange-400 transition-colors font-bold flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              Account
            </Link>
          ) : (
            <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
