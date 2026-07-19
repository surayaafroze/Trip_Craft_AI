"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { LogOut, Compass, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    // manual sign out for JWT
    document.cookie = "token=; path=/; max-age=0;";
    router.push("/");
    setTimeout(() => window.location.reload(), 100); // hard reload to clear cache
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
  ];

  if (session) {
    navLinks.push(
      { name: "Add Destination", href: "/items/add" },
      { name: "My Dashboard", href: "/dashboard" }
    );
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full glass border-b border-gray-200/50"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-ocean-600 to-teal-400 rounded-xl flex items-center justify-center text-white premium-shadow group-hover:scale-105 transition-transform">
              <Compass size={24} className="group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-ocean-600 transition-colors">
              TripCraft <span className="text-teal-600">AI</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${pathname === link.href ? "text-ocean-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"}`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-ocean-50 rounded-full -z-10 border border-ocean-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full premium-shadow border border-gray-100">
                <div className="w-7 h-7 bg-ocean-100 text-ocean-700 rounded-full flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                  {session.user.name?.split(' ')[0] || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-ocean-600 to-ocean-800 rounded-full premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
