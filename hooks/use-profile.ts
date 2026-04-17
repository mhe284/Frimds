import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/use-auth';

export type ProfileRow = {
  id: string;
  username: string | null;
  friend_code: string;
};

export function useProfile() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) {
      setProfile(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: qErr } = await supabase
      .from('profiles')
      .select('id, username, friend_code')
      .eq('id', session.user.id)
      .maybeSingle();

    if (qErr) {
      setError(qErr.message);
      setProfile(null);
    } else {
      setProfile(data as ProfileRow | null);
    }

    setIsLoading(false);
  }, [session?.user?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const addFriendByCode = useCallback(
    async (rawCode: string) => {
      if (!session?.user?.id) {
        return { ok: false as const, message: 'Not signed in' };
      }

      const code = rawCode.trim().toUpperCase().replace(/\s+/g, '');
      if (!code) {
        return { ok: false as const, message: 'Enter a friend code' };
      }

      const { data: other, error: lookupErr } = await supabase
        .from('profiles')
        .select('id')
        .eq('friend_code', code)
        .maybeSingle();

      if (lookupErr) {
        return { ok: false as const, message: lookupErr.message };
      }
      if (!other) {
        return { ok: false as const, message: 'No user found with that code' };
      }
      if (other.id === session.user.id) {
        return { ok: false as const, message: "That's your own code" };
      }

      const { error: insErr } = await supabase.from('friendships').insert({
        user_id: session.user.id,
        friend_id: other.id,
      });

      if (insErr) {
        if (insErr.code === '23505') {
          return { ok: false as const, message: 'You already added this friend' };
        }
        return { ok: false as const, message: insErr.message };
      }

      return { ok: true as const };
    },
    [session?.user?.id]
  );

  return { profile, isLoading, error, refetch: fetchProfile, addFriendByCode };
}
