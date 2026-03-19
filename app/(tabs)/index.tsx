import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        Frimds
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subheading}>
        Where do you want to go?
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
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
