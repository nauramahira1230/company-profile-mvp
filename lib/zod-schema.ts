import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email salah" }),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" }), 
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Format email salah" }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;