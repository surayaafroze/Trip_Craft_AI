"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Compass, DollarSign, BrainCircuit, Star, Globe2, Sparkles, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 bg-ocean-950 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-ocean-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 to-teal-900/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-teal-300 text-sm font-medium mb-8"
          >
            <Sparkles size={16} className="text-orange-400" />
            <span>The future of travel planning is here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
          >
            Your Perfect Trip, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-ocean-300">Planned by AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-ocean-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Experience smart, personalized itineraries with real-time budget tracking and intelligent destination recommendations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/register" 
              className="group relative px-8 py-4 bg-white text-ocean-900 rounded-full font-bold text-lg overflow-hidden premium-shadow hover:premium-shadow-hover transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Start Planning</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/explore" 
              className="group px-8 py-4 glass-dark text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explore Destinations 
              <Compass size={20} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ocean-200/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ocean-200/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. How TripCraft AI Works */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">How It Works</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Three simple steps to unlock your dream vacation.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
          >
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-ocean-100 via-teal-100 to-ocean-100 -z-10" />

            {[
              { num: "01", title: "Describe Your Trip", desc: "Tell us where you want to go, who you are traveling with, and your budget." },
              { num: "02", title: "AI Plans It", desc: "Our Agentic AI builds a smart itinerary, estimating daily costs based on real data." },
              { num: "03", title: "Refine Together", desc: "Chat with the AI to tweak activities, swap destinations, and perfect your journey." }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 hover:-translate-y-2 transition-transform duration-300 h-full">
                  <div className="w-20 h-20 bg-ocean-50 text-ocean-600 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <span className="text-3xl font-black">{step.num}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Why TripCraft AI (Alternating Background) */}
      <section className="py-32 bg-ocean-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-900/20 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-ocean-800/40 to-transparent -z-10 blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">Why TripCraft AI</h2>
            <p className="text-lg text-ocean-200 max-w-2xl mx-auto">Beyond standard LLMs, we combine real data with agentic intelligence.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: MapPin, title: "Real Destination Data", desc: "We use a rich database of community-curated destinations, ensuring accurate planning.", color: "text-teal-400" },
              { icon: DollarSign, title: "AI-Tracked Budget", desc: "The AI intelligently estimates and tracks your trip budget per day based on actual regional costs.", color: "text-orange-400" },
              { icon: BrainCircuit, title: "Agentic Memory", desc: "Our AI agent remembers your preferences and constraints across the entire conversation.", color: "text-ocean-300" }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-dark p-10 rounded-3xl border border-white/10 hover:bg-white/5 transition-colors">
                <feature.icon className={`${feature.color} w-12 h-12 mb-6`} />
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-ocean-100 leading-relaxed opacity-90">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Trending Destinations */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Trending Destinations</h2>
              <p className="text-gray-500">Highly rated spots discovered by our community.</p>
            </div>
            <Link href="/explore" className="group flex items-center gap-2 text-ocean-600 font-semibold hover:text-ocean-700 transition-colors">
              Explore all <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Elegant Skeleton State until real data is fetched in a real app */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-3xl premium-shadow overflow-hidden border border-gray-100 flex flex-col group">
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white/60 to-gray-100" />
                </div>
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-100 rounded-full w-16" />
                    <div className="h-5 bg-gray-100 rounded-full w-20" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-lg w-full" />
                  <div className="h-4 bg-gray-100 rounded-lg w-4/5" />
                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                    <div className="h-6 bg-gray-200 rounded-lg w-1/3" />
                    <div className="h-8 w-8 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Explore by Region */}
      <section className="py-32 bg-gray-50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Explore by Region</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {['Europe', 'Asia', 'North America', 'South America'].map((region, i) => (
              <motion.div key={region} variants={fadeUp}>
                <Link 
                  href={`/explore?region=${region}`} 
                  className="group relative h-64 rounded-3xl overflow-hidden premium-shadow flex items-center justify-center bg-gray-900 block"
                >
                  <div className="absolute inset-0 bg-ocean-900/40 group-hover:bg-ocean-900/20 transition-colors duration-500 z-10" />
                  
                  {/* Subtle placeholder image per region */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527668752968-14ce70a4a7ae?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out" />
                  
                  <div className="relative z-20 flex flex-col items-center gap-2">
                    <Globe2 size={28} className="text-white/80 group-hover:text-white transition-colors" />
                    <span className="text-white font-bold text-2xl tracking-tight">{region}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Loved by Travelers</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">See how TripCraft AI is changing the way people explore the world.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { name: "Sarah L.", role: "Solo Traveler", text: "The AI agent built an itinerary that matched exactly what I wanted. It saved me hours of planning!" },
              { name: "Mark & Emma", role: "Couples Trip", text: "Having the budget tracked automatically by the AI was a game-changer for our honeymoon." },
              { name: "David K.", role: "Family Vacation", text: "I loved how I could just tell the AI we needed kid-friendly spots, and it instantly updated the plan." }
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-background p-10 rounded-3xl border border-gray-100 premium-shadow">
                <div className="flex gap-1 mb-6 text-orange-400">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-lg font-medium">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-100 to-teal-100 text-ocean-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-gray-500 font-medium">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-ocean-900 z-0" />
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/50 to-transparent z-0" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Ready to plan your next trip?
          </h2>
          <p className="text-ocean-100 mb-12 text-xl md:text-2xl font-light">
            Join thousands of travelers using TripCraft AI to build smarter, perfectly tailored itineraries in minutes.
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 bg-white text-ocean-900 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform premium-shadow-hover"
          >
            Start Your Journey <ChevronRight size={20} />
          </Link>
        </motion.div>
      </section>
      
      {/* Global CSS for animations like shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
