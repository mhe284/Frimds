import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#D9EAD9', dark: '#35523F' }, 'icon');
  const hintColor = useThemeColor({ light: '#5B6B5F', dark: '#C4D4C8' }, 'text');
  const tint = useThemeColor({}, 'tint');

  const contentTop = insets.top + 10 + 42 + 16;

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.body, { paddingTop: contentTop, paddingHorizontal: 16 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.newPostCard,
            {
              backgroundColor: cardBg,
              borderColor: cardBorder,
              opacity: pressed ? 0.9 : 1,
            },
          ]}>
          <ThemedText type="defaultSemiBold" style={styles.newPostTitle}>
            New post
          </ThemedText>
          <ThemedText style={[styles.newPostHint, { color: hintColor }]}>
            Share something with your friends.
          </ThemedText>
          <View style={[styles.newPostPill, { backgroundColor: tint }]}>
            <ThemedText style={styles.newPostPillText}>Create</ThemedText>
          </View>
        </Pressable>
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.homeTitleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <Text style={styles.homeLetters}>home</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  body: {
    flex: 1,
  },
  newPostCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 110,
    justifyContent: 'center',
  },
  newPostTitle: {
    fontSize: 20,
    marginBottom: 6,
  },
  newPostHint: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  newPostPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  newPostPillText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  homeTitleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  homeLetters: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: 2,
    textTransform: 'lowercase',
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#508B6B',
    textShadowColor: '#3A664F',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },

});
