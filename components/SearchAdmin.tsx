"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    startTransition(() => {
      router.replace(`/admin?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full">
<input
  type="text"
  suppressHydrationWarning 
  placeholder="Cari nama atau email..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 px-5 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
      {isPending && (
        <div className="absolute right-4 top-3.5">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}