"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTrips, useCreateTrip, useDeleteTrip } from "@/hooks/useTrips";
import { Loader2, Trash2, MapPin, DollarSign, Calendar, Plus, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">My Trips</h1>
          <p className="text-gray-500 text-lg">Plan and manage your AI-assisted journeys.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-ocean-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 font-bold self-start md:self-auto"
        >
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="animate-spin text-ocean-600 w-12 h-12" />
        </div>
      ) : trips?.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-gray-100 rounded-3xl p-16 text-center premium-shadow">
          <div className="w-20 h-20 bg-ocean-50 text-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass size={36} />
          </div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight">No trips yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">Start your first adventure by creating a new AI-powered trip plan tailored to your budget.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-ocean-600 font-bold hover:text-ocean-700 transition-colors text-lg"
          >
            Create your first trip &rarr;
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips?.map((trip: Trip, index: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }}
              key={trip._id} 
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden premium-shadow hover:premium-shadow-hover hover:-translate-y-1 transition-all flex flex-col group relative"
            >
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground line-clamp-1 tracking-tight group-hover:text-ocean-600 transition-colors pr-8">{trip.title}</h3>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Delete this trip?")) {
                        deleteTrip.mutate(trip._id);
                      }
                    }}
                    disabled={deleteTrip.isPending}
                    className="absolute top-8 right-8 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center text-teal-600 font-semibold text-sm mb-6 bg-teal-50 w-fit px-3 py-1 rounded-full">
                  <MapPin size={14} className="mr-1.5" />
                  {trip.region}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">Budget Target:</span>
                    <span className="font-bold flex items-center text-foreground"><DollarSign size={14} className="text-gray-400"/>{trip.budgetTarget}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">Est. Total Cost:</span>
                    <span className={`font-bold flex items-center ${trip.estimatedTotalCost > trip.budgetTarget ? 'text-red-500' : 'text-green-500'}`}>
                      <DollarSign size={14} className={trip.estimatedTotalCost > trip.budgetTarget ? 'text-red-300' : 'text-green-300'}/>{trip.estimatedTotalCost || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-50 p-5 bg-gray-50/50 flex justify-between items-center group-hover:bg-ocean-50/30 transition-colors">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={12} /> {new Date(trip.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/dashboard/trips/${trip._id}`} className="text-ocean-600 font-bold text-sm hover:text-ocean-700 transition-colors">
                  Open Plan &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Trip Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ocean-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100"
            >
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Create New Trip</h2>
              <p className="text-gray-500 mb-8">Start planning your next amazing journey.</p>
              
              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Trip Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all font-medium placeholder:text-gray-400"
                    placeholder="e.g. Summer in Paris"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Region</label>
                  <select 
                    value={formData.region}
                    onChange={e => setFormData({...formData, region: e.target.value})}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all font-medium appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
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
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Budget Target (USD)</label>
                  <input 
                    type="number" 
                    value={formData.budgetTarget}
                    onChange={e => setFormData({...formData, budgetTarget: Number(e.target.value)})}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all font-medium"
                    min="0"
                  />
                </div>
                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" disabled={createTrip.isPending} className="px-6 py-3 bg-gradient-to-r from-ocean-600 to-ocean-800 text-white rounded-xl hover:shadow-lg font-bold disabled:opacity-70 flex items-center gap-2 transition-all">
                    {createTrip.isPending && <Loader2 size={16} className="animate-spin" />}
                    Create Plan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
