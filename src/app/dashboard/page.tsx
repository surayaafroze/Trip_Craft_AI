"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { MapPin, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {session?.user?.name || "Traveler"}!</p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-2">My Trips</h2>
          <p className="text-gray-500 mb-4">Manage your AI-planned trips.</p>
          <Link href="/dashboard/trips" className="text-blue-600 font-medium hover:underline">View Trips &rarr;</Link>
        </div>
        <Link href="/items/manage" className="block border rounded-xl p-6 hover:shadow-md transition-shadow group bg-white shadow-sm">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">My Destinations</h3>
          <p className="text-gray-600 text-sm">View, edit, and manage the destinations you have contributed.</p>
        </Link>
        <Link href="/items/add" className="block border rounded-xl p-6 hover:shadow-md transition-shadow group bg-white shadow-sm">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PlusCircle size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Add Destination</h3>
          <p className="text-gray-600 text-sm">Share a new amazing location with the community.</p>
        </Link>
      </div>
    </div>
  );
}
