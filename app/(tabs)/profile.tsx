import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';

const profileTabIcon = require('@/assets/images/tabicons/Profile Icon.png');

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const { session } = useAuth();
  const { profile, isLoading, error, addFriendByCode } = useProfile();
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const inputBg = useThemeColor({ light: '#FFF9FC', dark: '#1E121C' }, 'background');
  const labelMuted = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');

  const contentTop = insets.top + 10 + 42 + 16;

  const displayName =
    profile?.username?.trim() ||
    (session?.user.user_metadata?.full_name as string | undefined)?.trim() ||
    session?.user.email?.split('@')[0] ||
    'You';

  const onCopyCode = async () => {
    if (!profile?.friend_code) return;
    await Clipboard.setStringAsync(profile.friend_code);
    Alert.alert('Copied', 'Your friend code is on the clipboard.');
  };

  const onAddFriend = async () => {
    setAddLoading(true);
    try {
      const result = await addFriendByCode(friendCodeInput);
      if (result.ok) {
        setFriendCodeInput('');
        Alert.alert('Added', 'Friend added.');
      } else {
        Alert.alert("Couldn't add friend", result.message);
      }
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: contentTop, paddingHorizontal: 16, paddingBottom: 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size="large" color={tint} style={styles.loader} />
        ) : error ? (
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <ThemedText style={[styles.hintMuted, { color: labelMuted }]}>
              If you just set up Supabase, run the SQL in{' '}
              <ThemedText type="defaultSemiBold">supabase/migrations/</ThemedText> so profiles and
              friend codes exist.
            </ThemedText>
          </View>
        ) : !profile ? (
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <ThemedText type="defaultSemiBold" style={styles.missingTitle}>
              No profile yet
            </ThemedText>
            <ThemedText style={[styles.hintMuted, { color: labelMuted }]}>
              Run the migration in your Supabase project so new signups get a row here with a friend
              code. Accounts created before that may need a one-time backfill in the SQL editor.
            </ThemedText>
          </View>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <View style={styles.profileRow}>
                <View style={[styles.avatarRing, { borderColor: cardBorder }]}>
                  <Image source={profileTabIcon} style={styles.avatar} contentFit="contain" />
                </View>
                <View style={styles.profileTextCol}>
                  <ThemedText style={[styles.labelSmall, { color: labelMuted }]}>Username</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.username}>
                    {displayName}
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <ThemedText style={[styles.labelSmall, { color: labelMuted }]}>Your friend code</ThemedText>
              <View style={styles.codeRow}>
                <ThemedText type="defaultSemiBold" style={styles.friendCode}>
                  {profile?.friend_code ?? '—'}
                </ThemedText>
                <Pressable
                  onPress={onCopyCode}
                  disabled={!profile?.friend_code}
                  style={({ pressed }) => [
                    styles.copyButton,
                    { backgroundColor: tint, opacity: profile?.friend_code ? (pressed ? 0.85 : 1) : 0.4 },
                  ]}>
                  <ThemedText style={styles.copyButtonText}>Copy</ThemedText>
                </Pressable>
              </View>

              <View style={[styles.divider, colorScheme === 'dark' && styles.dividerDark]} />

              <ThemedText style={[styles.labelSmall, { color: labelMuted, marginBottom: 8 }]}>
                Add a friend
              </ThemedText>
              <ThemedText style={[styles.fieldHint, { color: labelMuted }]}>
                Enter their code (letters and numbers). They can find it here on their profile.
              </ThemedText>
              <TextInput
                value={friendCodeInput}
                onChangeText={setFriendCodeInput}
                placeholder="Friend code"
                placeholderTextColor={labelMuted}
                autoCapitalize="characters"
                autoCorrect={false}
                style={[
                  styles.input,
                  { color: textColor, borderColor: cardBorder, backgroundColor: inputBg },
                ]}
              />
              <Pressable
                onPress={onAddFriend}
                disabled={addLoading}
                style={({ pressed }) => [
                  styles.addButton,
                  { backgroundColor: tint, opacity: addLoading ? 0.7 : pressed ? 0.9 : 1 },
                ]}>
                {addLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.addButtonText}>Add friend</ThemedText>
                )}
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>

      <View
        pointerEvents="none"
        style={[
          styles.profileTitleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <Text style={styles.profileLetters}>profile</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 16,
  },
  loader: {
    marginTop: 24,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 143, 183, 0.12)',
  },
  avatar: {
    width: 56,
    height: 56,
  },
  profileTextCol: {
    flex: 1,
    minWidth: 0,
  },
  labelSmall: {
    fontSize: 13,
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  friendCode: {
    fontSize: 22,
    letterSpacing: 3,
    flex: 1,
  },
  copyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginVertical: 16,
  },
  dividerDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  fieldHint: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    letterSpacing: 2,
    marginBottom: 12,
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    marginBottom: 8,
  },
  missingTitle: {
    marginBottom: 8,
  },
  hintMuted: {
    fontSize: 13,
    lineHeight: 20,
  },
  profileTitleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  profileLetters: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: 2,
    textTransform: 'lowercase',
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#D1BE9A',
    textShadowColor: '#A3865C',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});
