"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountDashboard() {
  const { token, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push("/login");
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated && !token) {
    return null; // Will redirect
  }

  // Mock data since we don't have a dedicated user details endpoint yet
  const user = {
    name: "Daraz User",
    email: "user@daraz.com",
    joined: "July 2026",
    orders: [
      { id: "ORD-12345", date: "2026-07-19", total: 299.99, status: "Delivered" },
      { id: "ORD-12346", date: "2026-07-15", total: 49.99, status: "Processing" }
    ]
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-bold">{user.name}</h3>
                <p className="text-gray-400 text-xs">Member since {user.joined}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "profile" ? "bg-orange-500/10 text-orange-500 font-bold" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
              >
                My Profile
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "orders" ? "bg-orange-500/10 text-orange-500 font-bold" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
              >
                Order History
              </button>
              <Link 
                href="/wishlist"
                className="w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 block transition-colors"
              >
                My Wishlist
              </Link>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "settings" ? "bg-orange-500/10 text-orange-500 font-bold" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
              >
                Settings
              </button>
              <div className="pt-4 mt-4 border-t border-gray-800">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-bold"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      readOnly
                    />
                  </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div key={order.id} className="bg-black border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-bold">{order.id}</h4>
                      <p className="text-gray-400 text-sm">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                      <div className="text-right">
                        <p className="text-orange-500 font-bold">${order.total.toFixed(2)}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        {order.status}
                      </div>
                      <button className="text-sm text-gray-400 hover:text-white transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <input 
                      type="password" 
                      placeholder="Current Password"
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <input 
                      type="password" 
                      placeholder="New Password"
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-6 rounded-lg transition-colors border border-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
