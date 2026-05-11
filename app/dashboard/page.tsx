export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600">Selamat Datang, Admin!</h1>
      <p className="mt-4 text-gray-600">Ini adalah area rahasia yang sudah diproteksi oleh Proxy.</p>
      <button 
        onClick={() => {
          document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          window.location.href = "/login";
        }}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}