"use client";

import { useRecommendations } from "@/hooks/useRecommendations";
import ItemCard from "@/components/items/ItemCard";
import { Sparkles, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface RecommendationsSectionProps {
  filters: {
    region: string;
    minPrice: string;
    maxPrice: string;
  };
}

export default function RecommendationsSection({ filters }: RecommendationsSectionProps) {
  const { data: session } = authClient.useSession();
  
  const { data: recommendations, isLoading, isError } = useRecommendations({
    region: filters.region,
    budget: filters.maxPrice,
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
    <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-600 w-5 h-5" />
        <h2 className="text-xl font-bold text-gray-900">AI Recommended For You</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item: Record<string, unknown>) => (
          <div key={item._id as string} className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="p-4 bg-blue-600/5 text-blue-800 text-sm italic border-b border-blue-100 flex-grow-0">
              <span className="font-semibold not-italic">AI says: </span>
              &quot;{item.reasoning as string}&quot;
            </div>
            <div className="flex-grow">
              <ItemCard item={item as unknown as { _id: string; title: string; region: string; images: string[]; averageRating: number; estimatedCostPerDay: number; category: string; }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
