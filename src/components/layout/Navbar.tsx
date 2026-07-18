"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-blue-600">
            TripCraft AI
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
            {session && (
              <>
                <Link href="/items/add" className="hover:text-blue-600 transition-colors">Add Item</Link>
                <Link href="/items/manage" className="hover:text-blue-600 transition-colors">Manage Items</Link>
                <Link href="/dashboard/trips" className="hover:text-blue-600 transition-colors">My Trips</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
