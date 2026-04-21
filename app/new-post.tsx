import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFrimdsData, type EventCategory } from '@/hooks/use-frimds-data';
import { useThemeColor } from '@/hooks/use-theme-color';

const categoryOptions: EventCategory[] = ['Gaming', 'Music', 'Sports', 'Art', 'Food', 'Streaming'];

const imageThemeOptions = [
  { id: 'neon-grid', label: 'Neon Grid' },
  { id: 'sunset-wave', label: 'Sunset Wave' },
  { id: 'paper-ink', label: 'Paper Ink' },
];

const animationOptions = [
  { id: 'pulse', label: 'Pulse' },
  { id: 'float', label: 'Float' },
  { id: 'slide', label: 'Slide' },
];

export default function NewPostScreen() {
  const insets = useSafeAreaInsets();
  const { createEvent } = useFrimdsData();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [category, setCategory] = useState<EventCategory>('Gaming');
  const [imageThemeId, setImageThemeId] = useState(imageThemeOptions[0].id);
  const [animationStyleId, setAnimationStyleId] = useState(animationOptions[0].id);

  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#2A1826' }, 'background');
  const cardBorder = useThemeColor({ light: '#F0D5E4', dark: '#3D2840' }, 'icon');
  const muted = useThemeColor({ light: '#6B5A62', dark: '#C4B0BC' }, 'text');
  const inputBg = useThemeColor({ light: '#FFF9FC', dark: '#1E121C' }, 'background');

  const contentTop = insets.top + 10 + 42 + 16;
  const selectedImageLabel = useMemo(
    () => imageThemeOptions.find((option) => option.id === imageThemeId)?.label ?? imageThemeId,
    [imageThemeId]
  );
  const selectedAnimationLabel = useMemo(
    () => animationOptions.find((option) => option.id === animationStyleId)?.label ?? animationStyleId,
    [animationStyleId]
  );

  const onCreateEvent = () => {
    if (!title.trim() || !location.trim() || !startsAt.trim()) {
      Alert.alert('Missing details', 'Please add title, time, and location.');
      return;
    }

    createEvent({
      title: title.trim(),
      category,
      startsAt: startsAt.trim(),
      location: location.trim(),
      imageThemeId,
      animationStyleId,
    });

    setTitle('');
    setLocation('');
    setStartsAt('');
    setCategory('Gaming');
    setImageThemeId(imageThemeOptions[0].id);
    setAnimationStyleId(animationOptions[0].id);
    Alert.alert('Event created', 'Your event was added to Home and pre-selected.');
  };

  return (
    <ThemedView style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingTop: contentTop, paddingHorizontal: 16, paddingBottom: 30, gap: 14 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Create event post
          </ThemedText>
          <ThemedText style={[styles.hint, { color: muted }]}>Fill details and pick a visual style for the post card.</ThemedText>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Event title"
            placeholderTextColor={muted}
            style={[styles.input, { borderColor: cardBorder, color: muted, backgroundColor: inputBg }]}
          />
          <TextInput
            value={startsAt}
            onChangeText={setStartsAt}
            placeholder="When (e.g. Fri, 6:30 PM)"
            placeholderTextColor={muted}
            style={[styles.input, { borderColor: cardBorder, color: muted, backgroundColor: inputBg }]}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor={muted}
            style={[styles.input, { borderColor: cardBorder, color: muted, backgroundColor: inputBg }]}
          />

          <View style={styles.rowWrap}>
            {categoryOptions.map((option) => {
              const isActive = option === category;
              return (
                <Pressable
                  key={option}
                  onPress={() => setCategory(option)}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? '#B46885' : cardBorder,
                      backgroundColor: isActive ? '#F9DDE9' : inputBg,
                    },
                  ]}>
                  <Text style={styles.chipText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <ThemedText type="defaultSemiBold" style={styles.title}>Post style</ThemedText>

          <ThemedText style={[styles.fieldTitle, { color: muted }]}>Image theme</ThemedText>
          <View style={styles.rowWrap}>
            {imageThemeOptions.map((option) => {
              const isActive = option.id === imageThemeId;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setImageThemeId(option.id)}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? '#508B6B' : cardBorder,
                      backgroundColor: isActive ? '#E2F3EA' : inputBg,
                    },
                  ]}>
                  <Text style={styles.chipText}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <ThemedText style={[styles.fieldTitle, { color: muted }]}>Animation</ThemedText>
          <View style={styles.rowWrap}>
            {animationOptions.map((option) => {
              const isActive = option.id === animationStyleId;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setAnimationStyleId(option.id)}
                  style={[
                    styles.chip,
                    {
                      borderColor: isActive ? '#508B6B' : cardBorder,
                      backgroundColor: isActive ? '#E2F3EA' : inputBg,
                    },
                  ]}>
                  <Text style={styles.chipText}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.previewCard, { borderColor: cardBorder }]}>
            <Text style={styles.previewTitle}>{title.trim() || 'Your event preview'}</Text>
            <Text style={[styles.previewMeta, { color: muted }]}>{category} • {startsAt.trim() || 'Time TBD'}</Text>
            <Text style={[styles.previewMeta, { color: muted }]}>
              Theme: {selectedImageLabel} • Motion: {selectedAnimationLabel}
            </Text>
          </View>

          <Pressable style={styles.createButton} onPress={onCreateEvent}>
            <Text style={styles.createButtonText}>Publish event</Text>
          </Pressable>
        </View>
      </ScrollView>

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
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: '#A55474',
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 15,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  chipText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    color: '#6A4257',
  },
  fieldTitle: {
    fontSize: 14,
    fontFamily: 'Fredoka_600SemiBold',
    marginTop: 4,
  },
  previewCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  previewTitle: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 16,
    color: '#7D4A61',
  },
  previewMeta: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 12,
    marginTop: 3,
  },
  createButton: {
    marginTop: 6,
    borderRadius: 12,
    paddingVertical: 13,
    backgroundColor: '#B46885',
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Fredoka_600SemiBold',
    color: '#FFFFFF',
    fontSize: 15,
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
