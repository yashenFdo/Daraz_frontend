"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryProductsPage() {
  const { category } = useParams();
  const formattedCategory = typeof category === 'string' ? category.replace(/-/g, ' ') : '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch products filtered by category here:
    // fetch(`http://localhost:8080/api/v1/products?category=${formattedCategory}`)
    
    // Simulating API call for category specific products
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: `${formattedCategory.toUpperCase()} Item 1`,
          description: `High-quality ${formattedCategory} product.`,
          price: 99.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
          category: formattedCategory,
        },
        {
          id: "2",
          name: `${formattedCategory.toUpperCase()} Item 2`,
          description: `Premium ${formattedCategory} essential.`,
          price: 149.99,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
          category: formattedCategory,
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [category, formattedCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <Link href="/categories" className="text-gray-400 hover:text-white transition-colors text-sm inline-block mb-4">
          &larr; Back to Categories
        </Link>
        <h1 className="text-4xl font-bold tracking-tighter text-white capitalize">
          {formattedCategory} Products
        </h1>
        <p className="text-gray-400 mt-2">
          Showing all available products in this category.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
                <div className="flex items-center justify-between mt-4">
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
