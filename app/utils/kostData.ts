export interface Testimonial {
  name: string;
  comment: string;
  rating: number;
}

export interface Kost {
  id: number;
  name: string;
  location: string;
  coords: [number, number];
  price: number;
  tipe: "Putra" | "Putri" | "Campur";
  phone: string;
  image: string;
  gallery: string[];
  description: string;
  facilities: string[];
  testimonials: Testimonial[];
}

export const masterDataKost: Kost[] = [
  {
    id: 1,
    name: "Kost Putra Bali Mandiri",
    location: "Jimbaran, Kuta Selatan",
    coords: [-8.8149, 115.1583],
    price: 1500000,
    tipe: "Putra",
    phone: "628123456789",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=400",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=400"
    ],
    description: "Kost nyaman khusus putra, dekat dengan kampus UNUD.",
    facilities: ["WiFi 100Mbps", "AC", "K. Mandi Dalam"],
    testimonials: [{ name: "Budi", comment: "WiFi kenceng!", rating: 5 }]
  },
  // Tambahkan data id 2 sampai 10 di sini dengan format yang sama...
];