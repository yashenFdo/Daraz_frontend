"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`http://localhost:8080/api/v1/products/${id}`, { headers });
        
        if (!response.ok) throw new Error("Failed to load product");
        
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        // Fallback dummy data
        setProduct({
          id,
          name: "Premium Wireless Headphones",
          description: "Experience the ultimate sound quality with our Premium Wireless Headphones. Featuring industry-leading noise cancellation, 30-hour battery life, and crystal-clear voice calling. The ergonomic design ensures all-day comfort whether you're working from home or commuting.",
          price: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
          category: "Electronics",
          stock: 15
        });
        setError("Warning: Using dummy data because backend is unreachable.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, token]);

  const addToCart = async () => {
    if (!token) {
      alert("Please login to add to cart");
      return;
    }

    setAddingToCart(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      if (!response.ok) throw new Error("Failed to add to cart");
      
      alert("Added to cart successfully!");
    } catch (err) {
      alert("Added to cart (simulated)");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
        &larr; Back to Products
      </Link>
      
      {error && (
        <div className="bg-orange-500/10 border border-orange-500/50 text-orange-500 text-sm p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm font-medium text-orange-500 mb-4 uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-white mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div className="prose prose-invert max-w-none mb-8 text-gray-400">
            <p>{product.description}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              {product.stock} in stock
            </div>
            <span>•</span>
            <div>Ships in 24 hours</div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={addToCart}
              disabled={addingToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button className="px-6 py-4 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
