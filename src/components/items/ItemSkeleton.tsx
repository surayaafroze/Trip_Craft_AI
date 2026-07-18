export default function ItemSkeleton() {
  return (
    <div className="flex flex-col bg-white border rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        
        <div className="mt-auto pt-4 border-t flex justify-between items-center">
          <div className="flex flex-col gap-1 w-1/3">
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
