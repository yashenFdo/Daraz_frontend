"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login");
      return;
    }
    
    // Simulate fetching an order ID that was just created
    setOrderId(`ORD-${Math.floor(Math.random() * 1000000)}`);
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated && !token) return null;

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl shadow-orange-500/10">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. We have received your order and are getting it ready to be shipped.
        </p>

        <div className="bg-black border border-gray-800 rounded-xl p-4 mb-8 flex justify-between items-center text-left">
          <div>
            <p className="text-gray-500 text-sm">Order Reference</p>
            <p className="text-white font-bold tracking-wider">{orderId || '...'}</p>
          </div>
          <Link href="/account" className="text-sm font-bold text-orange-500 hover:text-orange-400">
            Track Order
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/products" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/account" 
            className="w-full bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-bold py-4 rounded-xl transition-colors"
          >
            View My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
