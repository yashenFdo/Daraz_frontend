"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/wishlists", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load wishlist");
        }

        const data = await response.json();
        setWishlistItems(data.items || []);
      } catch (err: any) {
        // Fallback dummy data for visualization
        setWishlistItems([
          {
            id: "1",
            productId: "2",
            name: "Smart Watch Series X",
            price: 199.99,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
            category: "Wearables"
          }
        ]);
        setError("Warning: Showing dummy data (Backend offline)");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [token, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tighter text-white mb-8">My Wishlist</h1>
      
      {error && (
        <div className="bg-orange-500/10 border border-orange-500/50 text-orange-500 text-sm p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-800">
          <p className="text-gray-400 mb-6 text-lg">Your wishlist is empty.</p>
          <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300">
              <Link href={`/products/${item.productId}`}>
                <div className="aspect-square bg-gray-800 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    onClick={(e) => e.preventDefault()} 
                    className="absolute top-4 right-4 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-orange-500 mb-1 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={(e) => { e.preventDefault(); alert('Added to cart!'); }}
                      className="text-orange-500 text-sm font-bold hover:text-orange-400"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
