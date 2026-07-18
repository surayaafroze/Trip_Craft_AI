export default function ItemSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden premium-shadow border border-gray-100 relative">
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white/60 to-gray-100" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded-lg w-1/2 mb-6 animate-pulse"></div>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/3">
            <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
          <div className="h-5 bg-gray-100 rounded-lg w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
