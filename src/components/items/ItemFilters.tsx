import React from "react";
import { Search } from "lucide-react";

export interface ItemFiltersState {
  search: string;
  region: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface ItemFiltersProps {
  filters: ItemFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<ItemFiltersState>>;
}

export default function ItemFilters({ filters, setFilters }: ItemFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-5 rounded-3xl premium-shadow border border-gray-100 mb-10 flex flex-col md:flex-row gap-4">
      <div className="flex-grow relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-ocean-600 transition-colors" />
        </div>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground placeholder:text-gray-400 font-medium"
        />
      </div>
      
      <div className="w-full md:w-56">
        <select
          name="region"
          value={filters.region}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
        >
          <option value="">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min $"
          className="w-full md:w-28 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max $"
          className="w-full md:w-28 px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium placeholder:text-gray-400"
        />
      </div>

      <div className="w-full md:w-56">
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ocean-500/20 focus:border-ocean-500 transition-all text-foreground font-medium appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
