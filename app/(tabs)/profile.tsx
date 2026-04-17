import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <View
        pointerEvents="none"
        style={[
          styles.profileTitleAnchor,
          {
            paddingTop: insets.top + 10,
            paddingLeft: 18 + insets.left,
          },
        ]}>
        <View style={styles.profileWord}>
          <Text style={[styles.profileLetters, styles.profileLettersShadow]}>profile</Text>
          <Text style={[styles.profileLetters, styles.profileLettersFace]}>profile</Text>
        </View>
      </View>

      {/* Add profile content here */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTitleAnchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  profileWord: {
    position: 'relative',
  },
  profileLetters: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 36,
    letterSpacing: 2,
    textTransform: 'lowercase',
  },
  profileLettersShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#6B5508',
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  profileLettersFace: {
    color: '#B8860B',
    textShadowColor: 'rgba(255, 248, 220, 0.55)',
    textShadowOffset: { width: 0, height: -1 },
    textShadowRadius: 1,
  },
});
