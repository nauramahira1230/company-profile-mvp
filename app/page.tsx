import Link from "next/link";

// DATA FETCHING
async function getCompanyData() {
  return {
    stats: [
      { label: "Pengguna Aktif", value: "10,000+" },
      { label: "Mitra Kost", value: "500+" },
      { label: "Kota", value: "25+" },
    ],
    team: [
      { id: 1, name: "Naura Mahira", role: "CEO & Founder", slug: "naura" },
      { id: 2, name: "Sefina Nur Fatimah", role: "CTO", slug: "sefina" },
      { id: 3, name: "Mesa Melinda", role: "COO", slug: "mesa" },
    ]
  };
}

export default async function HomePage() {
  const { stats, team } = await getCompanyData();

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] text-white">

        {/* BG IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Temukan Hunian Nyaman <br />
              <span className="text-blue-300">Tanpa Ribet</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 mb-6">
              KOSTIN membantu mahasiswa dan perantau menemukan kost terbaik dengan cepat, aman, dan terpercaya.
            </p>

            <div className="flex gap-4">
              <Link
                href="/services"
                className="bg-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                Lihat Layanan
              </Link>

              <Link
                href="/about"
                className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-blue-600">{s.value}</p>
                <p className="text-slate-500 text-sm uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div className="bg-white h-64 rounded-3xl shadow flex items-center justify-center text-5xl">
            🏠
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Visi & Misi</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-blue-600 mb-1">Visi</h3>
                <p className="text-slate-600">
                  Menjadi platform hunian digital terpercaya di Indonesia.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-600 mb-1">Misi</h3>
                <p className="text-slate-600">
                  Mempermudah pencarian kost dan membantu pemilik dalam mengelola properti secara efisien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Tim Kami</h2>
            <p className="text-slate-500 mt-2">
              Orang-orang hebat di balik KOSTIN
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {team.map((t) => (
              <div
                key={t.id}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center"
              >
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4">
                  👤
                </div>

                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{t.role}</p>

                <Link
                  href={`/team/${t.slug}`}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Lihat Profil →
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Tertarik Bergabung?
        </h2>

        <p className="mb-6 text-blue-100">
          Hubungi kami dan mulai perjalanan bersama KOSTIN.
        </p>

        <Link
          href="/contact"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Hubungi Kami
        </Link>
      </section>

    </div>
  );
}