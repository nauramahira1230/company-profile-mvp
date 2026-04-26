export default function ServicesPage() {
  const features = [
    {
      title: "Pencarian Area Kampus",
      desc: "Fitur utama buat nyaring kost yang lokasinya beneran deket sama kampus-kampus di Bali. Kamu tinggal pilih kampusnya, KOSTIN bakal nampilin pilihan hunian yang paling strategis.",
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
    // Background dengan pola dot subtle agar tidak "full white"
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-2xl mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-6">
            Fitur Utama <br /> Aplikasi KOSTIN.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">Aplikasi ini kami rancang dengan fitur-fitur yang emang dibutuhin banget sama mahasiswa rantau pas lagi nyari kost di Bali.</p>
        </div>

        {/* Grid Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-950/5 border border-blue-100 transition-all duration-300 hover:border-blue-300">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-5xl bg-blue-50 w-20 h-20 flex items-center justify-center rounded-3xl group-hover:bg-blue-950 group-hover:text-white transition-colors duration-500">{f.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-blue-950 mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Kecil di Halaman Services */}
        <div className="mt-20 pt-10 border-t border-slate-200 text-center"></div>
      </div>
    </div>
  );
}
