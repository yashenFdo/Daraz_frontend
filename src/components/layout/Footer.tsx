import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter text-orange-500">Daraz</h3>
            <p className="text-sm text-gray-400">
              Your one-stop destination for everything you need. Experience seamless shopping with our microservices architecture.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">How to Buy</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Daraz</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-orange-500 transition-colors">About Daraz</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors">Instagram</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Daraz E-Commerce. Built with Microservices & Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
