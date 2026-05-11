// components/SkeletonCard.tsx
import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 h-72 w-full flex flex-col gap-4 shadow-sm animate-pulse">
      {/* Kotak Gambar */}
      <div className="bg-gray-200 h-2/3 w-full rounded-xl"></div>

      {/* Baris Judul */}
      <div className="bg-gray-200 h-5 w-3/4 rounded-md mt-1"></div>

      {/* Baris Detail */}
      <div className="flex justify-between items-center gap-4 mt-1">
        <div className="bg-gray-200 h-4 w-1/2 rounded-md"></div>
        <div className="bg-gray-200 h-4 w-1/4 rounded-md"></div>
      </div>
    </div>
  );
}
