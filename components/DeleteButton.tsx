"use client";

import { useOptimistic, useTransition } from "react";
import { supabase } from "@/lib/supabase";

export default function DeleteButton({ id, onDelete }: { id: string, onDelete: (id: string) => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus?")) return;

    startTransition(async () => {
      // 1. Panggil fungsi onDelete yang ngerubah UI secara instan
      onDelete(id); 
      
      // 2. Baru proses di background ke Supabase
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      
      if (error) {
        alert("Gagal hapus data!");
        window.location.reload(); // Balikin data kalau gagal
      }
    });
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
    >
      {isPending ? "..." : "Hapus"}
    </button>
  );
}