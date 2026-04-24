export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Form Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input type="text" className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Masukkan nama..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-600 outline-none" placeholder="email@anda.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pesan</label>
                <textarea rows= {4} className="w-full p-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Apa yang bisa kami bantu?"></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                Kirim Sekarang
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-slate-600 mb-8">
              Punya pertanyaan atau ingin menjadi mitra? Tim kami siap menjawab pesan Anda dalam 24 jam.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">📍</div>
                <div>
                  <p className="font-bold">Alamat Kantor</p>
                  <p className="text-slate-500 text-sm">Jl. Pendidikan No. 45, Jakarta Selatan</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">📞</div>
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <p className="text-slate-500 text-sm">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">📧</div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-slate-500 text-sm">support@kostin.id</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}