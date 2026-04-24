export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Tentang <span className="text-blue-600">KOSTIN</span></h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            KOSTIN lahir dari keresahan mahasiswa yang kesulitan mencari hunian yang transparan dan nyaman. 
            Kami hadir untuk menjembatani antara pemilik kost dan pencari kost melalui teknologi yang mudah digunakan.
          </p>
        </div>

        {/* History & Value */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-blue-600 h-80 rounded-3xl flex items-center justify-center text-8xl">
            🚀
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Kenapa Memilih Kami?</h2>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span> 
                <span>**Keamanan Terjamin:** Semua mitra kami telah melalui proses verifikasi ketat.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span> 
                <span>**Transparansi Harga:** Tidak ada biaya tersembunyi antara penyewa dan pemilik.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span> 
                <span>**Dukungan 24/7:** Tim CS kami siap membantu kendala hunian Anda kapan saja.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}