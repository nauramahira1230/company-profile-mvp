export default function ServicesPage() {
  const features = [
    {
      title: "Pencarian Area Kampus",
      desc: "Fitur utama buat nyari kost yang lokasinya beneran deket sama kampus-kampus di Bali. Kamu tinggal pilih kampusnya, KOSTIN bakal nampilin pilihan hunian yang paling strategis.",
      icon: "🎓",
    },
    {
      title: "Detail Fasilitas & Foto",
      desc: "Bukan cuma foto estetik, fitur ini nampilin detail fasilitas kayak ketersediaan WiFi, parkir, sampe info jam malem secara transparan, sesuai sama data yang tim kita kumpulin.",
      icon: "📸",
    },
    {
      title: "Direct Owner Contact",
      desc: "Nggak perlu lewat perantara yang ribet. Aplikasi ini nyediain jalur komunikasi langsung ke pemilik kost biar kamu bisa tanya-tanya atau booking dengan lebih cepet.",
      icon: "📱",
    },
    {
      title: "Filter Budget Mahasiswa",
      desc: "Fitur filter harga yang disesuaiin sama kantong mahasiswa. Dari yang paling murah sampe yang fasilitas lengkap, semua bisa diatur sesuai budget bulanan kamu.",
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-2xl mb-20 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-6">
            Fitur Utama <br /> Aplikasi KOSTIN.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Aplikasi ini kami rancang dengan fitur-fitur yang emang dibutuhin banget sama mahasiswa rantau pas lagi nyari kost di Bali.
          </p>
        </div>

        {/* Grid Features - Clean & Static */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-blue-50"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon Box - Tetap Biru Muda (Statis) */}
                <div className="text-5xl bg-blue-50 w-20 h-20 flex items-center justify-center rounded-3xl text-blue-900 shrink-0">
                  {f.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-blue-950 mb-3 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200"></div>
      </div>
    </div>
  );
}