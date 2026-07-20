import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    { title: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80", count: 124 },
    { title: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80", count: 86 },
    { title: "Home & Garden", img: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80", count: 52 },
    { title: "Sports", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", count: 43 },
    { title: "Automotive", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", count: 28 },
    { title: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80", count: 91 }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          All Categories
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Browse our extensive collection of categories and find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((category, idx) => (
          <Link 
            href={`/categories/${category.title.toLowerCase().replace(/ & /g, '-')}`} 
            key={idx}
            className="group relative h-64 lg:h-80 rounded-2xl overflow-hidden block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <img 
              src={category.img} 
              alt={category.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-orange-500 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {category.count} Products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
