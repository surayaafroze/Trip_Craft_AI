import Link from "next/link";
import { MapPin, Star, DollarSign, ArrowRight } from "lucide-react";

interface ItemCardProps {
  item: {
    _id: string;
    title: string;
    region: string;
    images: string[];
    avgRating: number;
    avgDailyCost: number;
    category: string;
    shortDescription?: string;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item._id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden premium-shadow hover:premium-shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={item.images?.[0] || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80"} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 text-gray-900 shadow-lg">
          <Star size={14} className="text-orange-500 fill-current" />
          {item.avgRating ? item.avgRating.toFixed(1) : "New"}
        </div>
        <div className="absolute top-4 left-4 bg-ocean-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          {item.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-xl text-foreground line-clamp-1 tracking-tight group-hover:text-ocean-600 transition-colors">{item.title}</h3>
        </div>
        
        {item.shortDescription && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {item.shortDescription}
          </p>
        )}
        
        <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
          <MapPin size={16} className="mr-1.5 text-teal-600" />
          {item.region}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Est. cost</span>
            <span className="font-bold text-lg text-foreground flex items-center">
              <DollarSign size={16} className="text-gray-400" />
              {item.avgDailyCost} <span className="text-sm font-medium text-gray-400 ml-1">/day</span>
            </span>
          </div>
          <span className="text-ocean-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
