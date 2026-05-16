"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Perbaikan bug ikon penanda Leaflet default yang sering hilang di Next.js
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface KostData {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  // Kita buat opsional semua agar tidak memicu error 'undefined'
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
}

interface MapProps {
  kostData: KostData[];
}

export default function Map({ kostData }: MapProps) {
  // Titik tengah default peta: Bali (-8.4095, 115.1889)
  const defaultCenter: [number, number] = [-8.4095, 115.1889];

  return (
    <div className="w-full h-full min-h-[500px] relative">
      <MapContainer
        center={defaultCenter}
        zoom={9}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✨ PROSES PENYARINGAN SUPER AMAN DI BARIS 57 ✨ */}
        {Array.isArray(kostData) &&
          kostData.map((kost) => {
            // Ambil koordinat dengan toleransi nama variabel (lat/lng ATAU latitude/longitude)
            const fixLat = kost.latitude !== undefined ? kost.latitude : kost.lat;
            const fixLng = kost.longitude !== undefined ? kost.longitude : kost.lng;

            // 🔍 VALIDASI KRITIKAL: Jika koordinat tidak ditemukan, lewati data ini (jangan dirender)
            // Langkah ini menjamin Leaflet TIDAK AKAN PERNAH memicu error "reading lat" lagi!
            if (fixLat === undefined || fixLng === undefined || isNaN(fixLat) || isNaN(fixLng)) {
              console.warn(`Data Kost ID ${kost.id} dilewati karena koordinat tidak valid.`);
              return null;
            }

            return (
              <Marker 
                key={kost.id} 
                position={[fixLat, fixLng]} 
                icon={customIcon}
              >
                <Popup>
                  <div className="p-1 max-w-[200px]">
                    <img 
                      src={kost.image} 
                      alt={kost.name} 
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-bold text-sm text-slate-900 my-1">{kost.name}</h4>
                    <p className="text-blue-600 font-bold text-xs my-0">
                      Rp {kost.price.toLocaleString("id-ID")} / bln
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 mb-0">📍 {kost.location}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}