"use client";

import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import ItemCard from "@/components/items/ItemCard";
import ItemFilters from "@/components/items/ItemFilters";
import ItemSkeleton from "@/components/items/ItemSkeleton";
import RecommendationsSection from "@/components/recommendations/RecommendationsSection";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    search: "",
    region: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest"
  });
  
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useItems({ ...filters, page });

  return (
    <div className="bg-background min-h-screen pb-20 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Explore Destinations</h1>
          <p className="text-lg text-gray-500">Find your next adventure from our community-curated list.</p>
        </div>

        <ItemFilters filters={filters} setFilters={(action) => { setFilters(action); setPage(1); }} />

        {/* AI Smart Recommendation Engine Section */}
        <RecommendationsSection filters={filters} />

        {isError && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-8 border border-red-100 flex items-center gap-3">
            <span className="font-semibold">Failed to load destinations. Please try again later.</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ItemSkeleton key={i} />)}
          </div>
        ) : data?.items?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 premium-shadow text-center px-4"
          >
            <div className="w-24 h-24 bg-ocean-50 text-ocean-300 rounded-full flex items-center justify-center mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No destinations found</h3>
            <p className="text-gray-500 max-w-md mb-8">We couldn't find any destinations matching your current filters. Try adjusting your search criteria.</p>
            <button 
              onClick={() => {
                setFilters({ search: "", region: "", minPrice: "", maxPrice: "", sort: "newest" });
                setPage(1);
              }}
              className="px-8 py-3 bg-ocean-50 text-ocean-700 font-semibold rounded-full hover:bg-ocean-100 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {data?.items.map((item: Record<string, unknown>) => (
                <motion.div key={item._id as string} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <ItemCard item={item as unknown as { _id: string; title: string; region: string; images: string[]; avgRating: number; avgDailyCost: number; category: string; }} />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-6 py-2.5 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors premium-shadow"
                >
                  Previous
                </button>
                <div className="px-4 py-2 font-semibold text-gray-600 bg-gray-100 rounded-full">
                  {page} / {data.totalPages}
                </div>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-6 py-2.5 bg-white border border-gray-200 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors premium-shadow"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
