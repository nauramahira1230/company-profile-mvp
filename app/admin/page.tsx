import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import SearchAdmin from "@/components/SearchAdmin";

export const dynamic = 'force-dynamic';

async function getMessages(query: string) {
  let dbQuery = supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  const { data, error } = await dbQuery;
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export default async function AdminDashboard(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  // Menunggu Promise dari searchParams (Wajib di Next.js 15)
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  
  const messages = await getMessages(query);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-[#0f172a] text-white p-6 sticky top-0 z-50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="font-bold tracking-tight uppercase text-sm md:text-base">Kostin Admin</h1>
        </div>
        <Link href="/kostin" className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
          ← KEMBALI
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Inbox Pesan</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {query ? `Hasil cari: "${query}"` : `Total: ${messages.length} Data`}
            </p>
          </div>
          <div className="w-full md:w-80">
            <SearchAdmin />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-8 py-5">Nama</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">Pesan</th>
                  <th className="px-8 py-5 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {messages.length > 0 ? (
                  messages.map((msg: any) => (
                    <tr key={msg.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-8 py-6 font-bold text-sm text-slate-800">{msg.name}</td>
                      <td className="px-8 py-6 text-blue-600 text-xs font-semibold">{msg.email}</td>
                      <td className="px-8 py-6 text-sm text-slate-500 italic max-w-xs truncate">"{msg.message}"</td>
                      <td className="px-8 py-6 text-right text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {new Date(msg.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-300 font-bold uppercase tracking-widest italic text-xs">
                      {query ? `Data "${query}" tidak ditemukan` : 'Belum ada pesan masuk'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}