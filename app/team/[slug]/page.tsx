interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export default function TeamDetailPage({
  params,
}: {
  params: { slug?: string };
}) {

    console.log("PARAMS:", params);

  // 🔥 AMAN dari undefined + beda huruf besar kecil
  const slug = params?.slug?.toLowerCase() || "";

  // DATA
  const teamDetails: Record<string, TeamMember> = {
    naura: {
      name: "Naura Mahira",
      role: "CEO",
      bio: "Visioner KOSTIN yang bercita-cita menertibkan dunia per-kost-an.",
    },
    sefina: {
      name: "Sefina Nur Fatimah",
      role: "CTO",
      bio: "Ahli teknologi yang mengembangkan sistem KOSTIN.",
    },
    mesa: {
      name: "Mesa Melinda",
      role: "COO",
      bio: "Mengatur operasional dan memastikan pengalaman user terbaik.",
    },
  };

  const person = teamDetails[slug];

  // ❌ Kalau slug tidak ada
  if (!person) {
    return (
      <div className="py-20 text-center text-red-500 font-semibold">
        Data tidak ditemukan
      </div>
    );
  }

  // ✅ Tampilan detail
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg border">

        {/* FOTO */}
        <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full flex items-center justify-center text-4xl mb-6">
          👤
        </div>

        {/* NAMA */}
        <h1 className="text-3xl font-bold text-slate-900">
          {person.name}
        </h1>

        {/* ROLE */}
        <p className="text-blue-600 font-semibold mt-2">
          {person.role}
        </p>

        {/* GARIS */}
        <div className="w-16 h-1 bg-blue-600 mx-auto my-6 rounded-full"></div>

        {/* BIO */}
        <p className="text-slate-600 italic leading-relaxed">
          "{person.bio}"
        </p>
      </div>
    </div>
  );
}