import Link from "next/link";
import { MapPin, Star, DollarSign } from "lucide-react";

interface ItemCardProps {
  item: {
    _id: string;
    title: string;
    region: string;
    images: string[];
    averageRating: number;
    estimatedCostPerDay: number;
    category: string;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item._id}`} className="group flex flex-col bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={item.images[0] || "https://placehold.co/600x400?text=No+Image"} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-current" />
          {item.averageRating ? item.averageRating.toFixed(1) : "New"}
        </div>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          {item.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          {item.region}
        </div>
        
        <div className="mt-auto pt-4 border-t flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Est. cost</span>
            <span className="font-bold text-gray-900 flex items-center">
              <DollarSign size={14} />
              {item.estimatedCostPerDay}/day
            </span>
          </div>
          <span className="text-blue-600 font-medium text-sm group-hover:underline">View Details</span>
        </div>
      </div>
    </Link>
  );
}
