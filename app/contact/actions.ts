'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function submitContact(prevState: any, formData: FormData) {
  // Delay dikit biar loading state di button kelihatan
  await new Promise((res) => setTimeout(res, 1000))

  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  // Masukin ke tabel 'contacts'
  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }])

  if (error) {
    console.error('Database Error:', error.message)
    return { 
      success: false, 
      message: "Gagal kirim pesan. Coba lagi ya!" 
    }
  }

  revalidatePath('/contact')
  
  return { 
    success: true, 
    message: "Pesanmu udah kita terima, bakal segera dibalas!" 
  }
}