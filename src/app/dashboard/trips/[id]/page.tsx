"use client";

import React, { use } from "react";
import { useTrip } from "@/hooks/useTrips";
import TripBudgetChart from "@/components/trips/TripBudgetChart";
import TripChat from "@/components/trips/TripChat";
import { Loader2, MapPin, DollarSign, ArrowLeft, Calendar, Compass } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

interface Activity {
  time: string;
  activity: string;
  cost: number;
}

interface ItineraryDay {
  day: number;
  activities: Activity[];
}

export default function TripDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: trip, isLoading, isError } = useTrip(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError || !trip) {
    return notFound();
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        <div className="mb-10">
          <Link href="/dashboard/trips" className="text-gray-500 hover:text-ocean-600 font-semibold flex items-center gap-2 w-fit mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Trips
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">{trip.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1.5 font-medium"><MapPin size={18} className="text-teal-500" /> {trip.region}</span>
                <span className="bg-ocean-50 text-ocean-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 border border-ocean-100">
                  Target Budget: <DollarSign size={14}/>{trip.budgetTarget}
                </span>
              </div>
            </div>
            <div className={`px-6 py-4 rounded-2xl border premium-shadow flex flex-col items-end ${trip.estimatedTotalCost > trip.budgetTarget ? 'bg-red-50/50 border-red-100' : 'bg-green-50/50 border-green-100'}`}>
              <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${trip.estimatedTotalCost > trip.budgetTarget ? 'text-red-500' : 'text-green-600'}`}>Est. Total Cost</div>
              <div className={`text-3xl font-extrabold flex items-center ${trip.estimatedTotalCost > trip.budgetTarget ? 'text-red-600' : 'text-green-700'}`}>
                <DollarSign size={24}/>{trip.estimatedTotalCost || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Trip Itinerary</h2>
              {(!trip.itinerary || trip.itinerary.length === 0) ? (
                <div className="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-gray-400">
                    <Calendar size={28} />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Your itinerary is empty</p>
                  <p className="text-gray-500 max-w-sm mx-auto">Use the AI Agent on the right to start adding destinations and activities!</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {trip.itinerary.map((day: ItineraryDay, dayIdx: number) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIdx * 0.1 }}
                      key={day.day} 
                      className="border border-gray-100 rounded-2xl overflow-hidden premium-shadow-sm"
                    >
                      <div className="bg-gray-50 px-6 py-4 font-bold text-foreground border-b border-gray-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-sm">
                          {day.day}
                        </div>
                        Day {day.day}
                      </div>
                      <div className="divide-y divide-gray-50">
                        {day.activities.map((act: Activity, idx: number) => (
                          <div key={idx} className="p-6 flex gap-6 hover:bg-gray-50/50 transition-colors group">
                            <div className="w-20 font-bold text-ocean-600 text-sm pt-0.5">{act.time}</div>
                            <div className="flex-grow text-gray-700 font-medium leading-relaxed">{act.activity}</div>
                            <div className="font-bold text-gray-900 flex items-center shrink-0 bg-gray-100 px-3 py-1.5 rounded-lg h-fit group-hover:bg-white group-hover:shadow-sm transition-all">
                              <DollarSign size={14} className="text-gray-400"/>{act.cost}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <TripBudgetChart itinerary={trip.itinerary} budgetTarget={trip.budgetTarget} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TripChat tripId={trip._id} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
