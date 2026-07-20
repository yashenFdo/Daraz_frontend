"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit_card"
  });

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login?redirect=/checkout");
      return;
    }
    
    // Simulate fetching cart from Cart Service or Context
    setCartItems([
      { id: "1", name: "Premium Wireless Headphones", price: 299.99, quantity: 1 },
      { id: "2", name: "Mechanical Keyboard", price: 129.99, quantity: 2 }
    ]);
  }, [isAuthenticated, token, router]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = total * 0.08;
  const grandTotal = total + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate placing order against Order Service
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would pass the Order ID to the success page via router state or query param
      router.push("/checkout/success");
    }, 1500);
  };

  if (!isAuthenticated && !token) return null; // Wait for redirect

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter text-white">Checkout</h1>
        <p className="text-gray-400 mt-2">Complete your order securely.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Shipping Information */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name *</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name *</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Street Address *</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Postal Code *</label>
                  <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Country *</label>
                  <select required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors">
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="LK">Sri Lanka</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${formData.paymentMethod === 'credit_card' ? 'border-orange-500 bg-orange-500/5' : 'border-gray-700 hover:border-gray-500'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleInputChange} className="text-orange-500 focus:ring-orange-500 w-5 h-5" />
                    <div>
                      <h4 className="text-white font-bold">Credit Card</h4>
                      <p className="text-gray-400 text-sm">Processed securely by Stripe</p>
                    </div>
                  </div>
                  {formData.paymentMethod === 'credit_card' && (
                    <div className="mt-4 pl-9 space-y-4">
                      <input type="text" placeholder="Card Number" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                        <input type="text" placeholder="CVC" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
                      </div>
                    </div>
                  )}
                </label>

                <label className={`block border rounded-xl p-4 cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-500/5' : 'border-gray-700 hover:border-gray-500'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="text-orange-500 focus:ring-orange-500 w-5 h-5" />
                    <div>
                      <h4 className="text-white font-bold">Cash on Delivery (COD)</h4>
                      <p className="text-gray-400 text-sm">Pay when you receive your order</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                `Place Order — $${grandTotal.toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div>
                    <h4 className="text-white text-sm font-medium line-clamp-2">{item.name}</h4>
                    <p className="text-gray-400 text-xs mt-1">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-orange-500 font-bold whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-800 text-sm">
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
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-800 mt-2">
                <span className="text-white">Total</span>
                <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-3 text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Payments are secure and encrypted. We never store your credit card information.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
