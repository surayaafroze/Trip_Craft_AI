"use client";

import React, { use } from "react";
import { useTrip } from "@/hooks/useTrips";
import TripBudgetChart from "@/components/trips/TripBudgetChart";
import TripChat from "@/components/trips/TripChat";
import { Loader2, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <Link href="/dashboard/trips" className="text-gray-500 hover:text-blue-600 flex items-center gap-2 w-fit mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Trips
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1"><MapPin size={16} /> {trip.region}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  Target: <DollarSign size={14}/>{trip.budgetTarget}
                </span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl border ${trip.estimatedTotalCost > trip.budgetTarget ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
              <div className="text-sm opacity-80 font-medium">Estimated Total Cost</div>
              <div className="text-2xl font-bold flex items-center"><DollarSign size={20}/>{trip.estimatedTotalCost || 0}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
              {(!trip.itinerary || trip.itinerary.length === 0) ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
                  <p className="text-gray-500">Your itinerary is empty.</p>
                  <p className="text-sm text-gray-400 mt-2">Use the AI Agent on the right to start adding destinations and activities!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {trip.itinerary.map((day: ItineraryDay) => (
                    <div key={day.day} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-3 font-bold text-gray-800 border-b">
                        Day {day.day}
                      </div>
                      <div className="divide-y">
                        {day.activities.map((act: Activity, idx: number) => (
                          <div key={idx} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                            <div className="w-20 font-bold text-blue-600 text-sm">{act.time}</div>
                            <div className="flex-grow text-gray-800">{act.activity}</div>
                            <div className="font-medium text-gray-600 flex items-center shrink-0">
                              <DollarSign size={14}/>{act.cost}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
      </div>
    </div>
  );
}
