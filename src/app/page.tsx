import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-orange-950/30 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">E-Commerce</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Powered by a cutting-edge microservices architecture. Discover millions of products at unbeatable prices, with lightning-fast performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Start Shopping
            </Link>
            <Link 
              href="/categories" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-300 text-gray-300 hover:text-white font-bold rounded-full transition-all duration-300"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Highlights */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">Shop by Category</h2>
              <p className="text-gray-400">Find exactly what you're looking for</p>
            </div>
            <Link href="/categories" className="text-orange-500 hover:text-orange-400 font-medium hidden sm:block transition-colors">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { title: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80" },
              { title: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80" },
              { title: "Home & Garden", img: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=500&q=80" },
              { title: "Sports", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" }
            ].map((category, idx) => (
              <Link 
                href={`/categories/${category.title.toLowerCase()}`} 
                key={idx}
                className="group relative h-48 lg:h-64 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                <img 
                  src={category.img} 
                  alt={category.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900 border-t border-b border-gray-800">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter text-white mb-6">
            Ready to upgrade your shopping?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Join thousands of users enjoying our seamless, lightning-fast microservices architecture.
          </p>
          <Link 
            href="/register" 
            className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Create an Account Now
          </Link>
        </div>
      </section>
    </div>
  );
}
