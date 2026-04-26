export default function AboutPage() {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Judul Utama - Tanpa Garis Bawah */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-10 tracking-tight">Tentang Kami & KOSTIN</h1>

        <div className="space-y-8 text-slate-700 leading-relaxed text-lg text-justify">
          <p>KOSTIN lahir dari sebuah keresahan sederhana. Bermula dari pengamatan kami terhadap tantangan yang sering dihadapi oleh rekan-rekan mahasiswa, khususnya dari Indonesia Timur, saat pertama kali merantau ke Bali.</p>

          <p>
            Masalah yang kami temukan cukup klasik namun berdampak besar: informasi yang kurang transparan, ketidaksesuaian foto dengan kondisi asli di lapangan, hingga ketidakpastian harga. Sebagai sesama mahasiswa, kami memahami bahwa
            mencari tempat tinggal seharusnya tidak menjadi beban mental tambahan di tengah persiapan perkuliahan.
          </p>

          {/* Highlight Section - True Navy */}
          <div className="relative p-10 bg-blue-950 text-white rounded-[2rem] mt-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl italic font-serif">"</div>
            <h3 className="text-xl font-medium mb-6 leading-relaxed italic text-blue-100">
              "Fokus utama kami bukan sekadar membangun aplikasi, melainkan menciptakan rasa aman bagi teman-teman agar bisa mendapatkan hunian yang nyaman tanpa harus khawatir terkena penipuan."
            </h3>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-6"></div>
            <p className="text-sm text-blue-300 max-w-2xl">
              Melalui KOSTIN, kami mengintegrasikan basis data yang telah terverifikasi secara manual dengan sistem aplikasi yang stabil, sehingga proses pencarian kost menjadi jauh lebih efisien bagi setiap pengguna.
            </p>
          </div>

          <p className="pt-4">
            Hingga saat ini, kami terus berupaya menyempurnakan fitur-fitur di dalam aplikasi KOSTIN. Fokus pengembangan kami saat ini terpusat di wilayah Bali, terutama pada area di sekitar kampus yang menjadi titik utama bagi para
            mahasiswa rantau.
          </p>

          {/* Footer Info */}
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h4 className="font-bold text-blue-950 uppercase tracking-widest text-xs mb-2">Visi Kami</h4>
              <p className="text-sm text-slate-500 italic">Menjadi standar baru platform pencarian hunian bagi mahasiswa di Bali yang mengedepankan integritas data.</p>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-blue-950 uppercase tracking-widest text-xs mb-2">Lokasi Fokus</h4>
              <p className="text-sm text-slate-500">Area Kampus & Sekitarnya, Provinsi Bali, Indonesia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
