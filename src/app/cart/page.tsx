"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/cart", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load cart items");
        }

        const data = await response.json();
        setCartItems(data.items || []);
      } catch (err: any) {
        // Fallback for UI visualization
        setCartItems([
          {
            id: "1",
            productId: "1",
            name: "Premium Wireless Headphones",
            price: 299.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"
          },
          {
            id: "2",
            productId: "3",
            name: "Mechanical Keyboard",
            price: 129.99,
            quantity: 2,
            imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=200&q=80"
          }
        ]);
        setError("Warning: Showing dummy data (Backend offline)");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCart();
    }
  }, [token, isAuthenticated, router]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tighter text-white mb-8">Shopping Cart</h1>
      
      {error && (
        <div className="bg-orange-500/10 border border-orange-500/50 text-orange-500 text-sm p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-800">
          <p className="text-gray-400 mb-6 text-lg">Your cart is currently empty.</p>
          <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 bg-gray-900 border border-gray-800 p-4 rounded-2xl">
                <div className="w-24 h-24 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                    <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-black rounded-lg border border-gray-800">
                      <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">-</button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">+</button>
                    </div>
                    <button className="text-sm text-red-500 hover:text-red-400 transition-colors">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span className="text-white">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between font-bold text-lg">
                <span className="text-white">Total</span>
                <span className="text-orange-500">${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
