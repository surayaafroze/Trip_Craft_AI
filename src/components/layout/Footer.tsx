import { Compass } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-ocean-600 to-teal-400 rounded-lg flex items-center justify-center text-white">
                <Compass size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-ocean-600 transition-colors">
                TripCraft <span className="text-teal-600">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-sm mx-auto md:mx-0 leading-relaxed">
              Experience the future of travel planning. Smarter itineraries, real-time budgets, and personalized AI recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-600 font-medium">
              <Link href="/explore" className="hover:text-ocean-600 transition-colors">Explore Destinations</Link>
              <Link href="/items/add" className="hover:text-ocean-600 transition-colors">Add Destination</Link>
              <Link href="/dashboard" className="hover:text-ocean-600 transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-600 font-medium">
              <Link href="/about" className="hover:text-ocean-600 transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-ocean-600 transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-ocean-600 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>
            © {new Date().getFullYear()} TripCraft AI. Crafted with passion.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ocean-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-ocean-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-ocean-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
