import { createClient } from '@supabase/supabase-js';

// .env dosyasından bilgileri çekiyoruz
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL veya Key eksik! .env.local dosyanı kontrol et.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Hataları güvenli bir şekilde yakalamak için yardımcı fonksiyon.
 * unknown tipiyle çalışır ve geriye okunabilir bir mesaj döner.
 */
export const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  
  // Supabase'den gelen nesne bazlı hataları kontrol et
  if (typeof err === "object" && err !== null && "message" in err) {
    return (err as { message: string }).message;
  }
  
  return "Beklenmedik bir hata oluştu.";
};