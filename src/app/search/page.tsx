"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch search results from Catalog Service
    // fetch(`http://localhost:8080/api/v1/products/search?q=${encodeURIComponent(query)}`)
    
    // Simulating search delay
    setLoading(true);
    setTimeout(() => {
      if (query.trim() === "") {
        setProducts([]);
      } else {
        setProducts([
          {
            id: "1",
            name: `${query} Item Pro`,
            description: `A premium product matching your search for ${query}.`,
            price: 199.99,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
            category: "Search Results",
          },
          {
            id: "2",
            name: `${query} Basic`,
            description: `Standard edition product related to ${query}.`,
            price: 49.99,
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
            category: "Search Results",
          }
        ]);
      }
      setLoading(false);
    }, 800);
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tighter text-white">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400 mt-2">
          Found {products.length} matching products.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-800">
          <p className="text-gray-400 mb-6 text-lg">No products found matching your search.</p>
          <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300"
            >
              <div className="aspect-square bg-gray-800 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-orange-500">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
