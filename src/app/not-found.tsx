"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Map, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ocean-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-32 h-32 bg-white rounded-3xl premium-shadow flex items-center justify-center relative z-10 mx-auto"
          >
            <Compass size={64} className="text-ocean-600" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-4 -right-8 w-16 h-16 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-2xl flex items-center justify-center text-white premium-shadow-hover rotate-12"
          >
            <Map size={32} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-800 to-teal-500 mb-4 tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Looks like you&apos;re lost, Traveler!
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
            We couldn&apos;t find the destination you&apos;re looking for. It might have been moved, deleted, or perhaps it only exists in your dreams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-ocean-600 to-ocean-800 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 border border-gray-200 transition-all flex items-center justify-center gap-2 group premium-shadow"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
