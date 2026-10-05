import { supabase } from "./supabase";

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signInWithPassword(email, password) {
  if (!supabase) throw new Error("LOOP authentication is not configured yet.");
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithPassword(email, password) {
  if (!supabase) throw new Error("LOOP authentication is not configured yet.");
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
