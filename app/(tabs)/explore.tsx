import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { useFrimdsData, type EventCategory } from '@/hooks/use-frimds-data';
import { useThemeColor } from '@/hooks/use-theme-color';

const interestSource: EventCategory[] = ['Gaming', 'Music', 'Sports', 'Art', 'Food', 'Streaming'];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { areas, selectedArea, setSelectedArea, selectedInterests, toggleInterest, recommendations } = useFrimdsData();

  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const hintColor = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');
  const chipBg = useThemeColor({ light: '#FFF2F8', dark: '#342433' }, 'background');

  const contentTop = insets.top + 10 + 42 + 16;

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingTop: contentTop, paddingHorizontal: 16, paddingBottom: 30, gap: 14 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={styles.sectionTitle}>Find people near you</Text>
          <Text style={[styles.sectionHint, { color: hintColor }]}>Choose area and interests to refresh recommendations.</Text>

          <View style={styles.chipWrap}>
            {areas.map((area) => {
              const isActive = area === selectedArea;
              return (
                <Pressable
                  key={area}
                  onPress={() => setSelectedArea(area)}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? '#B46885' : cardBorder,
                      backgroundColor: isActive ? '#F9DDE9' : chipBg,
                    },
                  ]}>
                  <Text style={[styles.chipText, { color: isActive ? '#8D4A69' : '#7B5A69' }]}>{area}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.chipWrap}>
            {interestSource.map((interest) => {
              const isActive = selectedInterests.includes(interest);
              return (
                <Pressable
                  key={interest}
                  onPress={() => toggleInterest(interest)}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? '#508B6B' : cardBorder,
                      backgroundColor: isActive ? '#E2F3EA' : chipBg,
                    },
                  ]}>
                  <Text style={[styles.chipText, { color: isActive ? '#3E775A' : '#7B5A69' }]}>{interest}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={styles.sectionTitle}>Recommended friends</Text>
          {recommendations.length > 0 ? (
            <View style={styles.recommendationList}>
              {recommendations.map((person) => (
                <View key={person.id} style={[styles.recommendationCard, { borderColor: cardBorder }]}>
                  <View style={styles.personTopRow}>
                    <Text style={styles.personName}>{person.name}</Text>
                    <View style={[styles.distancePill, { backgroundColor: chipBg }]}>
                      <Text style={styles.distanceText}>{person.distanceKm} km</Text>
                    </View>
                  </View>
                  <Text style={[styles.personMeta, { color: hintColor }]}>{person.area} area</Text>
                  <Text style={[styles.personBio, { color: hintColor }]}>{person.bio}</Text>
                  <Text style={styles.personTags}>{person.interests.join(' • ')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.sectionHint, { color: hintColor }]}>No matches yet. Try broadening filters.</Text>
          )}
        </View>
      </ScrollView>

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
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 20,
    color: '#A55474',
  },
  sectionHint: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
  },
  recommendationList: {
    gap: 10,
  },
  recommendationCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  personTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  personName: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 17,
    color: '#6F3B56',
  },
  distancePill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  distanceText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    color: '#7B5A69',
  },
  personMeta: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
  },
  personBio: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 13,
    lineHeight: 18,
  },
  personTags: {
    marginTop: 2,
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    color: '#508B6B',
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
