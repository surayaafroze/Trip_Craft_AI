"use client";

import { useItem, useRelatedItems } from "@/hooks/useItems";
import { useParams } from "next/navigation";
import { MapPin, DollarSign, Calendar, Tag, Star } from "lucide-react";
import ReviewSection from "@/components/items/ReviewSection";
import ItemCard from "@/components/items/ItemCard";

export default function ItemDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const { data: item, isLoading, isError } = useItem(id);
  const { data: relatedItems } = useRelatedItems(id);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError || !item) return <div className="min-h-screen flex items-center justify-center text-red-500">Destination not found.</div>;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-2 uppercase tracking-wide">
                <span>{item.region}</span>
                <span>•</span>
                <span>{item.category}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={18} />
                  <span className="font-bold text-gray-900">{item.averageRating ? item.averageRating.toFixed(1) : "New"}</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-800 px-6 py-3 rounded-xl flex items-center gap-2 self-start md:self-auto">
              <DollarSign size={24} />
              <div>
                <div className="text-xs font-bold uppercase opacity-80">Estimated Cost</div>
                <div className="text-2xl font-bold">${item.estimatedCostPerDay}<span className="text-sm font-normal">/day</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 h-[60vh]">
          <div className="h-full rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-4 h-full">
            {item.images[1] ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.images[1]} alt={item.title} className="w-full h-full object-cover rounded-2xl" />
              </>
            ) : <div className="bg-gray-100 rounded-2xl h-full" />}
            {item.images[2] ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.images[2]} alt={item.title} className="w-full h-full object-cover rounded-2xl" />
              </>
            ) : <div className="bg-gray-100 rounded-2xl h-full" />}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </section>
            
            <section className="border-t pt-12">
              <ReviewSection destinationId={id} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 border rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-6">Key Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Region</div>
                    <div className="font-medium text-gray-900">{item.region}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <Tag size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium text-gray-900">{item.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Best time to visit</div>
                    <div className="font-medium text-gray-900">{item.bestTimeToVisit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems && relatedItems.length > 0 && (
          <section className="mt-20 border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Similar Destinations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem: Record<string, unknown>) => (
                <ItemCard key={relatedItem._id as string} item={relatedItem as unknown as { _id: string; title: string; region: string; images: string[]; averageRating: number; estimatedCostPerDay: number; category: string; }} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
