import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const AuthContext = createContext(null);

const NOT_CONFIGURED_ERROR = { message: 'Supabase is not configured' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email, password, metadata) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  }

  async function signIn(email, password) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signInWithGoogle() {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    });
  }

  async function signInWithMagicLink(email) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.signInWithOtp({ email });
  }

  async function signOut() {
    if (!supabase) return { error: NOT_CONFIGURED_ERROR };
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  async function resetPassword(email) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  }

  async function updatePassword(newPassword) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.updateUser({ password: newPassword });
  }

  async function updateProfile(metadata) {
    if (!supabase) return { data: null, error: NOT_CONFIGURED_ERROR };
    return supabase.auth.updateUser({ data: metadata });
  }

  async function deleteAccount() {
    if (!supabase) return { error: NOT_CONFIGURED_ERROR };
    // For now, signs out. Actual deletion requires server-side Edge Function.
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  const value = {
    user,
    session,
    isLoading,
    isSignedIn: !!user,
    isSupabaseConfigured: configured,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
