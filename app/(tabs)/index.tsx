import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({ light: '#FFF7FB', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#EBC9D8', dark: '#5A364C' }, 'icon');

  const contentTop = insets.top + 10 + 42 + 16;

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.body, { paddingTop: contentTop, paddingHorizontal: 16 }]}>
        <Link href="/new-post" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.newPostCard,
              {
                backgroundColor: cardBg,
                borderColor: cardBorder,
                opacity: pressed ? 0.9 : 1,
              },
            ]}>
            <View style={styles.plusSquare}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <Text style={styles.newPostLabel}>New post</Text>
          </Pressable>
        </Link>
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
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  plusSquare: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B46885',
  },
  plusText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
  },
  newPostLabel: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 18,
    color: '#A55474',
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
