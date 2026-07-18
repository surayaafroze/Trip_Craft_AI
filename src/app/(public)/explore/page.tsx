"use client";

import { useState } from "react";
import { useItems } from "@/hooks/useItems";
import ItemCard from "@/components/items/ItemCard";
import ItemFilters from "@/components/items/ItemFilters";
import ItemSkeleton from "@/components/items/ItemSkeleton";

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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Destinations</h1>
        <p className="text-gray-600 mb-8">Find your next adventure from our curated list.</p>

        <ItemFilters filters={filters} setFilters={(f) => { setFilters(f); setPage(1); }} />

        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8">
            Failed to load destinations. Please try again later.
          </div>
        )}

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ItemSkeleton key={i} />)}
          </div>
        ) : data?.items?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => {
                setFilters({ search: "", region: "", minPrice: "", maxPrice: "", sort: "newest" });
                setPage(1);
              }}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.items.map((item: any) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
            
            {/* Pagination */}
            {data?.totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="px-4 py-2 flex items-center font-medium">
                  Page {page} of {data.totalPages}
                </div>
                <button
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
