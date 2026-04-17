import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

/** Replace with real friend data. Empty = hint card. */
const friends: { id: string }[] = [];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const hasFriends = friends.length > 0;

  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const avatarBorder = useThemeColor({ light: '#E8C4D8', dark: '#5C3D52' }, 'icon');
  const avatarFill = useThemeColor({ light: '#FFF9FC', dark: '#1E121C' }, 'background');
  const hintColor = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');

  const emptyCardBg =
    colorScheme === 'dark' ? 'rgba(42, 24, 38, 0.42)' : 'rgba(255, 255, 255, 0.48)';
  const emptyCardBorder =
    colorScheme === 'dark' ? 'rgba(93, 60, 82, 0.4)' : 'rgba(240, 213, 228, 0.55)';

  const contentTop = insets.top + 10 + 42 + 16;

  return (
    <ThemedView style={styles.screen}>
      <View style={[styles.body, { paddingTop: contentTop, paddingHorizontal: 16 }]}>
        {hasFriends ? (
          <View style={[styles.friendsCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              contentContainerStyle={styles.friendsRow}
              keyboardShouldPersistTaps="handled">
              {friends.map((f) => (
                <View
                  key={f.id}
                  style={[
                    styles.friendAvatar,
                    { backgroundColor: avatarFill, borderColor: avatarBorder },
                  ]}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View
            style={[
              styles.emptyFriendsCard,
              { backgroundColor: emptyCardBg, borderColor: emptyCardBorder },
            ]}>
            <ThemedText style={[styles.emptyHint, { color: hintColor }]}>
              Add friends and they&apos;ll show up here.
            </ThemedText>
          </View>
        )}
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.bubbleTitleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <Text style={styles.bubbleLetters}>explore</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  friendsCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  emptyFriendsCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 22,
    paddingHorizontal: 18,
    minHeight: 96,
    justifyContent: 'center',
  },
  emptyHint: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.92,
  },
  friendsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
  },
  friendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
  },
  bubbleTitleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  bubbleLetters: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: 2,
    textTransform: 'lowercase',
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#B46885',
    textShadowColor: '#8E4F66',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});
