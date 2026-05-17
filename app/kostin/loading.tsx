// app/loading.tsx
import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Tulisan Loading di atas */}
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-8"></div>

      {/* Grid kartu-kartu bayangan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
