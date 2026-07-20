"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:8080/api/v1/products", {
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to load products. Backend might be offline.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        // Fallback dummy data if backend is not running yet
        setProducts([
          {
            id: "1",
            name: "Premium Wireless Headphones",
            description: "High-quality noise-canceling wireless headphones.",
            price: 299.99,
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
            category: "Electronics",
          },
          {
            id: "2",
            name: "Smart Watch Series X",
            description: "Next-gen smartwatch with health tracking.",
            price: 199.99,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
            category: "Wearables",
          },
          {
            id: "3",
            name: "Mechanical Keyboard",
            description: "RGB mechanical keyboard with tactile switches.",
            price: 129.99,
            imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
            category: "Accessories",
          }
        ]);
        setError("Warning: Showing dummy data because the backend is unreachable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tighter text-white mb-8">Our Products</h1>
      
      {error && (
        <div className="bg-orange-500/10 border border-orange-500/50 text-orange-500 text-sm p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="aspect-[4/3] bg-gray-800 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-orange-500 mb-2 uppercase tracking-wider">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="bg-orange-500/10 text-orange-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
