export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg text-gray-900 mb-2">TripCraft AI</h3>
          <p className="text-sm text-gray-500">
            Plan your perfect trip with AI-powered recommendations.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-gray-600 font-medium">
          <a href="/about" className="hover:text-blue-600 transition-colors">About Us</a>
          <a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a>
          <a href="/explore" className="hover:text-blue-600 transition-colors">Explore Destinations</a>
        </div>
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} TripCraft AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
