"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/items/ImageUploader";
import { useCreateItem } from "@/hooks/useItems";
import { Loader2, X, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const addItemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(200),
  fullDescription: z.string().min(10, "Full description must be at least 10 characters").max(2000),
  region: z.enum(["Europe", "Asia", "North America", "South America", "Africa", "Oceania"]),
  category: z.enum(["Beach", "Mountain", "City", "Culture", "Adventure", "Relaxation"]),
  avgDailyCost: z.number().positive("Cost must be positive"),
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
    <div className="bg-background min-h-screen py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-4xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">Add New Destination</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Share an amazing place with the TripCraft AI community. Help travelers discover their next dream vacation.</p>
        </div>

        <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-8 md:p-12">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 font-medium border border-red-100">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Destination Title</label>
                <input
                  {...register("title")}
                  type="text"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400 text-lg"
                  placeholder="e.g. Santorini Sunset Villas"
                />
                {errors.title && <p className="text-red-500 text-xs mt-2 font-medium">{errors.title.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Short Description</label>
                <textarea
                  {...register("shortDescription")}
                  rows={2}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400 resize-none"
                  placeholder="A quick 1-2 sentence summary to hook travelers..."
                />
                {errors.shortDescription && <p className="text-red-500 text-xs mt-2 font-medium">{errors.shortDescription.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Overview</label>
                <textarea
                  {...register("fullDescription")}
                  rows={5}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400 resize-none"
                  placeholder="Provide all the details: best time to go, hidden gems, and what to expect..."
                />
                {errors.fullDescription && <p className="text-red-500 text-xs mt-2 font-medium">{errors.fullDescription.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Region</label>
                <select
                  {...register("region")}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                >
                  <option value="">Select Region</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
                {errors.region && <p className="text-red-500 text-xs mt-2 font-medium">{errors.region.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</label>
                <select
                  {...register("category")}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
                >
                  <option value="">Select Category</option>
                  <option value="Beach">Beach</option>
                  <option value="Mountain">Mountain</option>
                  <option value="City">City</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Relaxation">Relaxation</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-2 font-medium">{errors.category.message}</p>}
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Estimated Cost / Day ($)</label>
                <input
                  {...register("avgDailyCost", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400"
                  placeholder="e.g. 150"
                />
                {errors.avgDailyCost && <p className="text-red-500 text-xs mt-2 font-medium">{errors.avgDailyCost.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Destination Gallery (Max 5)</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {images.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transform opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <div className="aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-ocean-400 transition-colors bg-gray-50 flex items-center justify-center">
                      <ImageUploader onImageUploaded={handleImageUploaded} />
                    </div>
                  )}
                </div>
                {images.length === 0 && <p className="text-gray-400 text-sm mt-3 font-medium flex items-center gap-2"><PlusCircle size={16} /> Upload at least one high-quality image</p>}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={createItem.isPending}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-ocean-600 to-ocean-800 text-white rounded-full hover:shadow-lg hover:-translate-y-0.5 font-bold text-lg disabled:opacity-70 flex items-center justify-center gap-3 transition-all"
              >
                {createItem.isPending && <Loader2 size={20} className="animate-spin" />}
                Publish Destination
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
