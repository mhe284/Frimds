import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <View
        pointerEvents="none"
        style={[
          styles.homeTitleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <View style={styles.homeWord}>
          <Text style={[styles.homeLetters, styles.homeLettersShadow]}>home</Text>
          <Text style={[styles.homeLetters, styles.homeLettersFace]}>home</Text>
        </View>
      </View>
      <ThemedText type="title" style={styles.heading}>
        Frimds
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subheading}>
        guess
      </ThemedText>

      <ThemedView style={styles.bubblesRow}>
        {/* Home bubble (stays on this screen) */}
        <Pressable style={[styles.bubble, styles.homeBubble]}>
          <ThemedText style={styles.bubbleLabel}>Home</ThemedText>
        </Pressable>

        {/* Events / Explore bubble */}
        <Link href="/(tabs)/explore" asChild>
          <Pressable style={[styles.bubble, styles.eventsBubble]}>
            <ThemedText style={styles.bubbleLabel}>Events</ThemedText>
          </Pressable>
        </Link>

        {/* Profile bubble */}
        <Link href="/(tabs)/profile" asChild>
          <Pressable style={[styles.bubble, styles.profileBubble]}>
            <ThemedText style={styles.bubbleLabel}>Profile</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  homeTitleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  homeWord: {
    position: 'relative',
  },
  homeLetters: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 36,
    letterSpacing: 2,
    textTransform: 'lowercase',
  },
  homeLettersShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#A8D4B4',
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  homeLettersFace: {
    color: '#E8F8EC',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: -1 },
    textShadowRadius: 1,
  },
  heading: {
    marginBottom: 8,
  },
  subheading: {
    marginBottom: 32,
  },
  bubblesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  homeBubble: {
    backgroundColor: Colors.light.tint,
  },
  eventsBubble: {
    backgroundColor: Colors.light.icon,
  },
  profileBubble: {
    backgroundColor: Colors.light.tabIconDefault,
  },
  bubbleLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
