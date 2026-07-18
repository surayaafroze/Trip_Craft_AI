"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/items/ImageUploader";
import { useCreateItem } from "@/hooks/useItems";
import { Loader2, X } from "lucide-react";

const addItemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  region: z.enum(["Europe", "Asia", "North America", "South America", "Africa", "Oceania"]),
  category: z.enum(["Beach", "Mountain", "City", "Culture", "Adventure", "Relaxation"]),
  estimatedCostPerDay: z.number().positive("Cost must be positive"),
  bestTimeToVisit: z.string().min(2, "Required").max(100),
});

type AddItemFormValues = z.infer<typeof addItemSchema>;

export default function AddItemPage() {
  const router = useRouter();
  const createItem = useCreateItem();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
  });

  const handleImageUploaded = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: AddItemFormValues) => {
    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }
    setError(null);
    
    createItem.mutate(
      { ...data, images },
      {
        onSuccess: (newItem: Record<string, unknown>) => {
          router.push(`/items/${newItem._id}`);
        },
        onError: () => {
          setError("Failed to create destination. Please try again.");
        }
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Destination</h1>
          <p className="text-gray-500 mb-8">Share an amazing place with the TripCraft AI community.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  {...register("title")}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Santorini Sunset Villas"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what makes this destination special..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  {...register("region")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Region</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
                {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  {...register("category")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                  <option value="City">City</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Relaxation">Relaxation</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost Per Day ($)</label>
                <input
                  {...register("estimatedCostPerDay", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="150"
                />
                {errors.estimatedCostPerDay && <p className="text-red-500 text-xs mt-1">{errors.estimatedCostPerDay.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
                <input
                  {...register("bestTimeToVisit")}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. May to September"
                />
                {errors.bestTimeToVisit && <p className="text-red-500 text-xs mt-1">{errors.bestTimeToVisit.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Images (Max 5)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((url, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <ImageUploader onImageUploaded={handleImageUploaded} />
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={createItem.isPending}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {createItem.isPending && <Loader2 size={18} className="animate-spin" />}
                Publish Destination
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
