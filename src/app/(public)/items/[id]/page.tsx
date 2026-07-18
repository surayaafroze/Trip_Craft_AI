"use client";

import { useItem, useRelatedItems } from "@/hooks/useItems";
import { useParams } from "next/navigation";
import { MapPin, DollarSign, Calendar, Tag, Star, ArrowLeft, Share2, Heart } from "lucide-react";
import ReviewSection from "@/components/items/ReviewSection";
import ItemCard from "@/components/items/ItemCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";

export default function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: item, isLoading, isError } = useItem(id);
  const { data: relatedItems } = useRelatedItems(id);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-ocean-200 border-t-ocean-600 rounded-full animate-spin"></div>
    </div>
  );
  
  if (isError || !item) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
        <Link href="/explore" className="text-ocean-600 hover:underline">Back to Explore</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen pb-32 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-ocean-600 transition-colors">
            <ArrowLeft size={16} /> Back to explore
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-ocean-600 transition-colors px-4 py-2 rounded-full hover:bg-gray-100">
              <Share2 size={16} /> Share
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors px-4 py-2 rounded-full hover:bg-gray-100">
              <Heart size={16} /> Save
            </button>
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <span className="px-4 py-1.5 glass-dark text-white rounded-full text-xs font-bold uppercase tracking-wider">{item.region}</span>
            <span className="px-4 py-1.5 bg-ocean-50 text-ocean-700 rounded-full text-xs font-bold uppercase tracking-wider">{item.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">{item.title}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-600 font-medium text-lg">
            <div className="flex items-center gap-1.5">
              <Star className="text-orange-500 fill-current" size={20} />
              <span className="font-bold text-gray-900">{item.avgRating ? item.avgRating.toFixed(1) : "New"}</span>
              <span className="text-gray-400">({item.reviewCount || 0} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="text-teal-600" size={20} />
              <span>{item.region}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery - Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 mb-16 h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden premium-shadow group">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images?.[0] || "https://placehold.co/800x600?text=No+Image"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>
          <div className="hidden md:block relative overflow-hidden h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images?.[1] || "https://placehold.co/600x400?text=Placeholder"} alt={`${item.title} 2`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" />
          </div>
          <div className="hidden md:block relative overflow-hidden h-full rounded-tr-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images?.[2] || "https://placehold.co/600x400?text=Placeholder"} alt={`${item.title} 3`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" />
          </div>
          <div className="hidden md:block relative overflow-hidden h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images?.[3] || "https://placehold.co/600x400?text=Placeholder"} alt={`${item.title} 4`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" />
          </div>
          <div className="hidden md:block relative overflow-hidden h-full rounded-br-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images?.[4] || "https://placehold.co/600x400?text=Placeholder"} alt={`${item.title} 5`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 relative">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-6 tracking-tight text-foreground">About this destination</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="font-semibold text-xl text-ocean-900 mb-6 leading-relaxed">{item.shortDescription}</p>
                <p className="leading-loose whitespace-pre-wrap">{item.fullDescription}</p>
              </div>
            </section>
            
            <section className="border-t border-gray-100 pt-16">
              <ReviewSection destinationId={id} />
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-28 bg-white border border-gray-100 rounded-3xl p-8 premium-shadow">
              <div className="mb-6 flex items-end gap-2">
                <span className="text-4xl font-extrabold text-foreground">${item.avgDailyCost}</span>
                <span className="text-gray-500 font-medium mb-1">/ day estimated</span>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl mb-8 bg-gray-50/50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-lg">
                    <Star size={18} className="text-orange-500 fill-current" /> {item.avgRating ? item.avgRating.toFixed(1) : "New"}
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Reviews</span>
                  <div className="font-bold text-lg text-gray-900">{item.reviewCount || 0}</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-ocean-600 to-ocean-800 text-white font-bold text-lg py-4 rounded-full premium-shadow hover:premium-shadow-hover hover:-translate-y-0.5 transition-all mb-6">
                Add to Trip Planner
              </button>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-ocean-50 rounded-full flex items-center justify-center text-ocean-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Located in {item.region}</div>
                    <div className="text-sm text-gray-500">Popular destination</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                    <Tag size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Perfect for {item.category}</div>
                    <div className="text-sm text-gray-500">Highly recommended</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems && relatedItems.length > 0 && (
          <section className="mt-32 border-t border-gray-100 pt-20">
            <h2 className="text-3xl font-bold mb-10 tracking-tight text-foreground">More like this</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem: Record<string, unknown>) => (
                <ItemCard key={relatedItem._id as string} item={relatedItem as unknown as { _id: string; title: string; region: string; images: string[]; avgRating: number; avgDailyCost: number; category: string; }} />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}
