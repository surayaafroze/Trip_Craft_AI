"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTrips, useCreateTrip, useDeleteTrip } from "@/hooks/useTrips";
import { Loader2, Trash2, MapPin, DollarSign, Calendar, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Trip {
  _id: string;
  title: string;
  region: string;
  budgetTarget: number;
  estimatedTotalCost: number;
  createdAt: string;
}

export default function TripsPage() {
  const { data: trips, isLoading } = useTrips();
  const createTrip = useCreateTrip();
  const deleteTrip = useDeleteTrip();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", region: "Europe", budgetTarget: 1000 });
  const [error, setError] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.region) {
      setError("Please fill all fields");
      return;
    }
    setError(null);
    createTrip.mutate(formData, {
      onSuccess: (newTrip) => {
        setIsModalOpen(false);
        router.push(`/dashboard/trips/${newTrip._id}`);
      },
      onError: () => {
        setError("Failed to create trip");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-gray-600">Plan and manage your AI-assisted journeys.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
      ) : trips?.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">No trips yet</h3>
          <p className="text-gray-500 mb-6">Start your first adventure by creating a new trip plan.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 font-medium hover:underline"
          >
            Create your first trip &rarr;
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips?.map((trip: Trip) => (
            <div key={trip._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{trip.title}</h3>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Delete this trip?")) {
                        deleteTrip.mutate(trip._id);
                      }
                    }}
                    disabled={deleteTrip.isPending}
                    className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin size={14} className="mr-1" />
                  {trip.region}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Budget Target:</span>
                  <span className="font-semibold flex items-center"><DollarSign size={14}/>{trip.budgetTarget}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Est. Total Cost:</span>
                  <span className={`font-semibold flex items-center ${trip.estimatedTotalCost > trip.budgetTarget ? 'text-red-600' : 'text-green-600'}`}>
                    <DollarSign size={14}/>{trip.estimatedTotalCost || 0}
                  </span>
                </div>
              </div>
              <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-500">{new Date(trip.createdAt).toLocaleDateString()}</span>
                <Link href={`/dashboard/trips/${trip._id}`} className="text-blue-600 font-medium text-sm hover:underline">
                  Open Plan &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Trip Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Summer in Paris"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select 
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Target (USD)</label>
                <input 
                  type="number" 
                  value={formData.budgetTarget}
                  onChange={e => setFormData({...formData, budgetTarget: Number(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  min="0"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                <button type="submit" disabled={createTrip.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  {createTrip.isPending && <Loader2 size={16} className="animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
