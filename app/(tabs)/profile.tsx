import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
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
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';

const avatarOptions = {
  profile: require('@/assets/images/tabicons/Profile Icon.png'),
  home: require('@/assets/images/tabicons/Home Icon.png'),
  explore: require('@/assets/images/tabicons/Explore Icon.png'),
} as const;

type AvatarOptionKey = keyof typeof avatarOptions;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, isLoading, error, addFriendByCode } = useProfile();
  const [friendCodeInput, setFriendCodeInput] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOptionKey>('profile');

  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const inputBg = useThemeColor({ light: '#FFF9FC', dark: '#1E121C' }, 'background');
  const labelMuted = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const pickerBackdrop = 'rgba(18, 10, 18, 0.45)';
  const selectedAvatarSource = avatarOptions[selectedAvatar];

  const contentTop = insets.top + 10 + 42 + 16;

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
            <View style={styles.profileRow}>
              <Pressable
                onPress={() => setIsAvatarPickerOpen(true)}
                style={({ pressed }) => [styles.avatarPressable, { opacity: pressed ? 0.88 : 1 }]}>
                <View style={[styles.avatarRing, { borderColor: cardBorder }]}>
                  <Image source={selectedAvatarSource} style={styles.avatar} contentFit="contain" />
                </View>
                <View style={[styles.avatarEditBadge, { backgroundColor: tint, borderColor: cardBg }]}>
                  <Text style={styles.avatarEditBadgeText}>✎</Text>
                </View>
              </Pressable>
              <View style={styles.profileTextCol}>
                <ThemedText type="defaultSemiBold" style={styles.missingTitle}>
                  No profile yet
                </ThemedText>
                <ThemedText style={[styles.hintMuted, { color: labelMuted }]}>
                  Run the Supabase migration so you get a friend code here. Existing accounts may need
                  a one-time backfill.
                </ThemedText>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <View style={styles.profileRow}>
                <Pressable
                  onPress={() => setIsAvatarPickerOpen(true)}
                  style={({ pressed }) => [styles.avatarPressable, { opacity: pressed ? 0.88 : 1 }]}>
                  <View style={[styles.avatarRing, { borderColor: cardBorder }]}>
                    <Image source={selectedAvatarSource} style={styles.avatar} contentFit="contain" />
                  </View>
                  <View style={[styles.avatarEditBadge, { backgroundColor: tint, borderColor: cardBg }]}>
                    <Text style={styles.avatarEditBadgeText}>✎</Text>
                  </View>
                </Pressable>
                <View style={styles.profileTextCol}>
                  <ThemedText style={[styles.labelSmall, { color: labelMuted }]}>Your friend code</ThemedText>
                  <View style={styles.codeRow}>
                    <ThemedText type="defaultSemiBold" style={styles.friendCode}>
                      {profile.friend_code}
                    </ThemedText>
                    <Pressable
                      onPress={onCopyCode}
                      disabled={!profile.friend_code}
                      style={({ pressed }) => [
                        styles.copyButton,
                        {
                          backgroundColor: tint,
                          opacity: profile.friend_code ? (pressed ? 0.85 : 1) : 0.4,
                        },
                      ]}>
                      <ThemedText style={styles.copyButtonText}>Copy</ThemedText>
                    </Pressable>
                  </View>
                  <ThemedText style={[styles.codeHint, { color: labelMuted }]}>
                    Friends enter this code to add you.
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
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

      <Modal
        visible={isAvatarPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAvatarPickerOpen(false)}>
        <Pressable style={[styles.modalBackdrop, { backgroundColor: pickerBackdrop }]} onPress={() => setIsAvatarPickerOpen(false)}>
          <Pressable
            onPress={() => {}}
            style={[styles.avatarPickerCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <ThemedText type="defaultSemiBold" style={styles.avatarPickerTitle}>
              Choose your icon
            </ThemedText>
            <View style={styles.avatarOptionsRow}>
              {(Object.keys(avatarOptions) as AvatarOptionKey[]).map((key) => {
                const isSelected = selectedAvatar === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => {
                      setSelectedAvatar(key);
                      setIsAvatarPickerOpen(false);
                    }}
                    style={[
                      styles.avatarOption,
                      {
                        borderColor: isSelected ? tint : cardBorder,
                        backgroundColor: isSelected ? 'rgba(255, 143, 183, 0.14)' : inputBg,
                      },
                    ]}>
                    <Image source={avatarOptions[key]} style={styles.avatarOptionImage} contentFit="contain" />
                    <ThemedText style={[styles.avatarOptionLabel, { color: labelMuted }]}>
                      {key}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
            <Pressable onPress={() => setIsAvatarPickerOpen(false)} style={[styles.closePickerButton, { backgroundColor: tint }]}>
              <ThemedText style={styles.closePickerButtonText}>Done</ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
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
  avatarPressable: {
    position: 'relative',
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
  avatarEditBadge: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarEditBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  profileTextCol: {
    flex: 1,
    minWidth: 0,
  },
  labelSmall: {
    fontSize: 13,
    marginBottom: 4,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  friendCode: {
    fontSize: 22,
    letterSpacing: 3,
    flex: 1,
    minWidth: 0,
  },
  codeHint: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
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
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatarPickerCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  avatarPickerTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  avatarOptionsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  avatarOption: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  avatarOptionImage: {
    width: 40,
    height: 40,
  },
  avatarOptionLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  closePickerButton: {
    marginTop: 4,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closePickerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
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
