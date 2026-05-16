// app/lib/zod-schema.ts (atau sesuai folder lib kamu)
import { z } from 'zod';

// 1. Schema Login Bawaan Tim Kamu (Tetap Dipertahankan)
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email salah" }),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" }), 
});

// 2. ✨ TAMBAHAN: Schema Register Baru (Menyesuaikan Gaya Ketikan Tim Kamu)
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" }),
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email salah" }),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" }),
});

// 3. Schema Contact Bawaan Tim Kamu (Tetap Dipertahankan)
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Format email salah" }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter" }),
});

// 4. Type Inference (Ditambahkan RegisterInput agar serasi)
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>; // ✨ Tambahan baru
export type ContactInput = z.infer<typeof contactSchema>;