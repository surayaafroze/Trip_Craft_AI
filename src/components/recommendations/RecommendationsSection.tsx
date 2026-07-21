"use client";

import { useRecommendations } from "@/hooks/useRecommendations";
import ItemCard from "@/components/items/ItemCard";
import { Sparkles, Loader2 } from "lucide-react";
import { useSession } from "@/hooks/useSession";

import { useState } from "react";

interface RecommendationsSectionProps {
  filters: {
    region: string;
    minPrice: string;
    maxPrice: string;
  };
}

export default function RecommendationsSection({ filters }: RecommendationsSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | undefined>(undefined);
  
  const { data: session } = useSession();
  
  const { data: recommendations, isLoading, isError } = useRecommendations({
    region: filters.region,
    budget: filters.maxPrice,
    prompt: activePrompt,
  });

  // Only show if user is logged in
  if (!session) return null;

  if (isLoading) {
    return (
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-blue-600 w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-900">AI Recommended For You</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-3 text-blue-600 font-medium">Analyzing your preferences...</span>
        </div>
      </div>
    );
  }

  if (isError || !recommendations || recommendations.length === 0) {
    return null; // Fail silently or show nothing if no recommendations
  }

  return (
    <div className="mb-16 bg-gradient-to-br from-ocean-50 to-teal-50 rounded-3xl p-8 border border-ocean-100 premium-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">AI Recommended For You</h2>
        </div>
        
        <div className="flex gap-2 max-w-lg w-full">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Refine... (e.g. 'Show cheaper options', 'Only beaches')"
            className="flex-grow px-4 py-2 border border-ocean-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActivePrompt(inputValue);
              }
            }}
          />
          <button 
            onClick={() => setActivePrompt(inputValue)}
            disabled={isLoading}
            className="px-5 py-2 bg-ocean-600 text-white rounded-xl font-medium hover:bg-ocean-700 transition-colors text-sm disabled:opacity-70 flex-shrink-0"
          >
            Refine
          </button>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((item: Record<string, unknown>) => (
          <div key={item._id as string} className="flex flex-col h-full bg-white rounded-3xl premium-shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:-translate-y-1 hover:premium-shadow-hover">
            <div className="p-5 bg-gradient-to-r from-ocean-50/50 to-teal-50/50 text-ocean-800 text-sm italic border-b border-gray-100 flex-grow-0">
              <span className="font-bold not-italic">AI insights: </span>
              &quot;{item.reasoning as string}&quot;
            </div>
            <div className="flex-grow bg-white">
              <ItemCard item={item as unknown as { _id: string; title: string; region: string; images: string[]; avgRating: number; avgDailyCost: number; category: string; }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
