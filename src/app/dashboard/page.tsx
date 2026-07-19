"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { MapPin, PlusCircle, Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-6xl"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-lg">Welcome back, {session?.user?.name || "Traveler"}! Let&apos;s plan your next adventure.</p>
          </div>
          <Link href="/dashboard/trips" className="bg-ocean-600 text-white px-6 py-3 rounded-full font-bold premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all flex items-center gap-2 self-start md:self-auto">
            <PlusCircle size={18} /> Plan New Trip
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link href="/dashboard/trips" className="block p-8 bg-white rounded-3xl premium-shadow hover:premium-shadow-hover border border-gray-100 transition-all group h-full hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Compass size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-foreground tracking-tight group-hover:text-ocean-600 transition-colors">My AI Trips</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">Manage your smart, AI-generated itineraries and budgets.</p>
              <div className="flex items-center text-ocean-600 font-semibold gap-1">
                View all trips <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/items/manage" className="block p-8 bg-white rounded-3xl premium-shadow hover:premium-shadow-hover border border-gray-100 transition-all group h-full hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight group-hover:text-ocean-600 transition-colors">My Destinations</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">View, edit, and manage the destinations you have contributed.</p>
              <div className="flex items-center text-teal-600 font-semibold gap-1">
                Manage listings <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/items/add" className="block p-8 bg-gradient-to-br from-ocean-600 to-ocean-800 rounded-3xl premium-shadow hover:premium-shadow-hover transition-all group h-full hover:-translate-y-1 text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <PlusCircle size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Add Destination</h3>
              <p className="text-ocean-100 mb-8 leading-relaxed">Share a new amazing location with the TripCraft AI community.</p>
              <div className="flex items-center text-white font-semibold gap-1 opacity-90 group-hover:opacity-100">
                Create new <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
