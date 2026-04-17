import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function NewPostScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const muted = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');

  const contentTop = insets.top + 10 + 42 + 16;

  return (
    <ThemedView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.body, { paddingTop: contentTop, paddingHorizontal: 16 }]}>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            New post
          </ThemedText>
          <ThemedText style={[styles.hint, { color: muted }]}>
            Your post composer can go here next.
          </ThemedText>
        </View>
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.titleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <Text style={styles.titleLetters}>new post</Text>
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
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
  },
  titleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  titleLetters: {
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
