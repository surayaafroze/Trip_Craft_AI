"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Compass, DollarSign, BrainCircuit, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80")' }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Perfect Trip, Planned by AI
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience smart, personalized itineraries with real-time budget tracking and intelligent destination recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Explore Destinations <Compass size={18} />
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              Start Planning <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. How TripCraft AI Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Describe Your Trip</h3>
              <p className="text-gray-600">Tell us where you want to go, who you are traveling with, and your budget.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">AI Plans It</h3>
              <p className="text-gray-600">Our Agentic AI builds a smart itinerary, estimating daily costs based on real data.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Refine Together</h3>
              <p className="text-gray-600">Chat with the AI to tweak activities, swap destinations, and perfect your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why TripCraft AI */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why TripCraft AI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <MapPin className="text-blue-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Real Destination Data</h3>
              <p className="text-gray-600">We use a rich database of community-curated destinations, not just generic LLM text.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <DollarSign className="text-green-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">AI-Tracked Budget</h3>
              <p className="text-gray-600">The AI intelligently estimates and tracks your trip budget per day based on activities.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <BrainCircuit className="text-purple-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agentic Memory</h3>
              <p className="text-gray-600">Our AI agent remembers your preferences and trip constraints across the whole conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trending Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Destinations</h2>
              <p className="text-gray-600">Highly rated spots from our community.</p>
            </div>
            <Link href="/explore" className="text-blue-600 font-medium hover:underline flex items-center gap-1 hidden sm:flex">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-xl overflow-hidden shadow-sm flex flex-col">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 flex-grow flex flex-col gap-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/explore" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Explore by Region */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore by Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Europe', 'Asia', 'North America', 'South America'].map((region) => (
              <Link 
                href={`/explore?region=${region}`} 
                key={region}
                className="group relative h-40 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gray-800"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                <span className="relative z-20 text-white font-bold text-lg">{region}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">What Travelers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah L.", role: "Solo Traveler", text: "The AI agent built an itinerary that matched exactly what I wanted. It saved me hours of planning!" },
              { name: "Mark & Emma", role: "Couples Trip", text: "Having the budget tracked automatically by the AI was a game-changer for our honeymoon." },
              { name: "David K.", role: "Family Vacation", text: "I loved how I could just tell the AI we needed kid-friendly spots, and it instantly updated the plan." }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl border">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-700 italic mb-4">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to plan your next trip?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of travelers using TripCraft AI to build smarter, perfectly tailored itineraries.
          </p>
          <Link href="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
