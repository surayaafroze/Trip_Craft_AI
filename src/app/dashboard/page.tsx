"use client";

import { useSession } from "@/lib/auth-client";

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
          <a href="/dashboard/trips" className="text-blue-600 font-medium hover:underline">View Trips &rarr;</a>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-2">Manage Items</h2>
          <p className="text-gray-500 mb-4">Update or delete your destinations.</p>
          <a href="/items/manage" className="text-blue-600 font-medium hover:underline">Manage &rarr;</a>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-2">Add New Item</h2>
          <p className="text-gray-500 mb-4">Share a new destination with the community.</p>
          <a href="/items/add" className="text-blue-600 font-medium hover:underline">Add Item &rarr;</a>
        </div>
      </div>
    </div>
  );
}
