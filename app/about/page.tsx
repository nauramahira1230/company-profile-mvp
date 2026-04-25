export default function AboutPage() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b-4 border-slate-900 inline-block">Tentang KOSTIN</h1>
        <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
          <p>KOSTIN adalah platform hunian digital yang lahir dari kebutuhan mahasiswa akan transparansi dan kemudahan dalam mencari tempat tinggal di perantauan.</p>
          <p>Berawal dari tugas project di ITENAS Bandung, kini KOSTIN dikembangkan untuk menjadi standar baru dalam pengelolaan properti dan pencarian kost di Indonesia yang mengutamakan keamanan dan kepercayaan.</p>
          <div className="p-8 bg-slate-900 text-white rounded-3xl mt-10">
            <h3 className="text-xl font-bold mb-2">Visi Kami</h3>
            <p className="opacity-80">Menjadi jembatan utama yang menghubungkan penyewa dan pemilik kost dengan sistem yang cerdas dan transparan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
