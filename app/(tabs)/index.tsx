import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { useFrimdsData, type EventCategory } from '@/hooks/use-frimds-data';
import { useThemeColor } from '@/hooks/use-theme-color';

const categoryOrder: EventCategory[] = ['Gaming', 'Music', 'Sports', 'Art', 'Food', 'Streaming'];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { events, selectedEventIds, toggleEventSelection } = useFrimdsData();
  const cardBg = useThemeColor({ light: '#FFF7FB', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#EBC9D8', dark: '#5A364C' }, 'icon');
  const muted = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');
  const liveBg = useThemeColor({ light: '#DFF6E8', dark: '#1F3C2E' }, 'background');
  const liveText = useThemeColor({ light: '#2F7652', dark: '#8AE2B6' }, 'text');
  const chipBg = useThemeColor({ light: '#FCEAF2', dark: '#372233' }, 'background');

  const contentTop = insets.top + 10 + 42 + 16;
  const selectedEvents = events.filter((event) => selectedEventIds.includes(event.id));

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingTop: contentTop, paddingHorizontal: 16, paddingBottom: 28, gap: 14 }}
        showsVerticalScrollIndicator={false}>
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
            <Text style={styles.newPostLabel}>Post a new event</Text>
          </Pressable>
        </Link>

        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={styles.sectionTitle}>Your selected events</Text>
          <Text style={[styles.sectionHint, { color: muted }]}>Toggle any event below to join or leave.</Text>
          {selectedEvents.length > 0 ? (
            <View style={styles.compactList}>
              {selectedEvents.map((event) => (
                <View key={event.id} style={[styles.compactItem, { borderColor: cardBorder }]}>
                  <Text style={styles.compactTitle}>{event.title}</Text>
                  <Text style={[styles.compactMeta, { color: muted }]}>
                    {event.startsAt} • {event.location}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.sectionHint, { color: muted }]}>No events selected yet.</Text>
          )}
        </View>

        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={styles.sectionTitle}>Current events</Text>
          <View style={styles.categoryWrap}>
            {categoryOrder.map((category) => (
              <View key={category} style={[styles.categoryChip, { backgroundColor: chipBg, borderColor: cardBorder }]}>
                <Text style={styles.categoryChipText}>{category}</Text>
              </View>
            ))}
          </View>

          <View style={styles.eventList}>
            {events.map((event) => {
              const isSelected = selectedEventIds.includes(event.id);
              return (
                <View key={event.id} style={[styles.eventCard, { borderColor: cardBorder }]}>
                  <View style={styles.eventTopRow}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={[styles.statusPill, { backgroundColor: event.status === 'live' ? liveBg : chipBg }]}>
                      <Text style={[styles.statusText, { color: event.status === 'live' ? liveText : '#A55474' }]}>
                        {event.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.eventMeta, { color: muted }]}>{event.category} • Host: {event.hostName}</Text>
                  <Text style={[styles.eventMeta, { color: muted }]}>
                    {event.startsAt} • {event.location} • {event.attendees} joined
                  </Text>

                  <Pressable
                    onPress={() => toggleEventSelection(event.id)}
                    style={({ pressed }) => [
                      styles.joinButton,
                      {
                        backgroundColor: isSelected ? '#E5A8C1' : '#B46885',
                        opacity: pressed ? 0.9 : 1,
                      },
                    ]}>
                    <Text style={styles.joinButtonText}>{isSelected ? 'Selected' : 'Select event'}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

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
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 20,
    color: '#7E4360',
  },
  sectionHint: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Fredoka_600SemiBold',
  },
  compactList: {
    gap: 8,
  },
  compactItem: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
  },
  compactTitle: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 16,
    color: '#6C3952',
  },
  compactMeta: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
    marginTop: 2,
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryChipText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    color: '#8A4C69',
  },
  eventList: {
    gap: 10,
    marginTop: 4,
  },
  eventCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 6,
  },
  eventTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  eventTitle: {
    flex: 1,
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 17,
    color: '#6F3B56',
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    textTransform: 'capitalize',
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
  },
  eventMeta: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
  },
  joinButton: {
    alignSelf: 'flex-start',
    marginTop: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  joinButtonText: {
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
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
