import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'frimds-local-state-v1';

type EventStatus = 'live' | 'upcoming';
export type EventCategory =
  | 'Gaming'
  | 'Music'
  | 'Sports'
  | 'Art'
  | 'Food'
  | 'Streaming';

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  status: EventStatus;
  startsAt: string;
  location: string;
  hostName: string;
  attendees: number;
  imageThemeId: string;
  animationStyleId: string;
};

type RecommendationProfile = {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  interests: EventCategory[];
  bio: string;
};

export type AvatarKey = 'profile' | 'home' | 'explore';

type ProfileCustomization = {
  displayName: string;
  bio: string;
  pronouns: string;
  city: string;
  avatarKey: AvatarKey;
  interests: EventCategory[];
};

type FrimdsState = {
  selectedEventIds: string[];
  selectedArea: string;
  selectedInterests: EventCategory[];
  profile: ProfileCustomization;
  createdEvents: EventItem[];
};

const EVENT_SOURCE: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Downtown Indie Game Night',
    category: 'Gaming',
    status: 'live',
    startsAt: 'Today, 7:30 PM',
    location: 'Arcade Alley - Central District',
    hostName: 'Kira',
    attendees: 27,
    imageThemeId: 'neon-grid',
    animationStyleId: 'pulse',
  },
  {
    id: 'ev-2',
    title: 'Open Mic + Chill Beats',
    category: 'Music',
    status: 'upcoming',
    startsAt: 'Thu, 6:00 PM',
    location: 'Harbor Hall',
    hostName: 'Milo',
    attendees: 18,
    imageThemeId: 'sunset-wave',
    animationStyleId: 'float',
  },
  {
    id: 'ev-3',
    title: 'Sketch Walk in Old Town',
    category: 'Art',
    status: 'upcoming',
    startsAt: 'Sat, 11:00 AM',
    location: 'Market Square',
    hostName: 'Luna',
    attendees: 12,
    imageThemeId: 'paper-ink',
    animationStyleId: 'slide',
  },
];

const PEOPLE_SOURCE: RecommendationProfile[] = [
  {
    id: 'p-1',
    name: 'Ari',
    area: 'Local',
    distanceKm: 2,
    interests: ['Gaming', 'Streaming', 'Food'],
    bio: 'Co-op fan, boba explorer, and late-night stream watcher.',
  },
  {
    id: 'p-2',
    name: 'Noa',
    area: 'Local',
    distanceKm: 4,
    interests: ['Art', 'Music', 'Food'],
    bio: 'Draws tiny city scenes and hunts for cozy live sets.',
  },
  {
    id: 'p-3',
    name: 'Jules',
    area: 'Vancouver',
    distanceKm: 14,
    interests: ['Sports', 'Gaming', 'Music'],
    bio: 'Weekend run club, retro RPG nights, and playlist swaps.',
  },
  {
    id: 'p-4',
    name: 'Sam',
    area: 'Seattle',
    distanceKm: 24,
    interests: ['Streaming', 'Art', 'Music'],
    bio: 'Clips creator who likes museum pop-ups and karaoke.',
  },
];

const ALL_AREAS = ['Local', 'Vancouver', 'Seattle', 'Toronto', 'New York'];

type FrimdsContextValue = {
  areas: string[];
  events: EventItem[];
  selectedEventIds: string[];
  selectedInterests: EventCategory[];
  selectedArea: string;
  profile: ProfileCustomization;
  recommendations: RecommendationProfile[];
  toggleEventSelection: (eventId: string) => void;
  setSelectedArea: (area: string) => void;
  toggleInterest: (interest: EventCategory) => void;
  updateProfile: (next: Partial<ProfileCustomization>) => void;
  createEvent: (input: {
    title: string;
    category: EventCategory;
    startsAt: string;
    location: string;
    imageThemeId: string;
    animationStyleId: string;
  }) => void;
};

const FrimdsDataContext = createContext<FrimdsContextValue | undefined>(undefined);

const defaultState: FrimdsState = {
  selectedEventIds: ['ev-1', 'ev-2', 'ev-3'],
  selectedArea: 'Local',
  selectedInterests: ['Gaming', 'Music'],
  profile: {
    displayName: 'Frimds User',
    bio: 'Say hi and join me at community events!',
    pronouns: 'they/them',
    city: 'Local',
    avatarKey: 'profile',
    interests: ['Gaming', 'Music'],
  },
  createdEvents: [],
};

export function FrimdsDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FrimdsState>(defaultState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as FrimdsState;
        setState({
          ...defaultState,
          ...parsed,
          profile: { ...defaultState.profile, ...parsed.profile },
        });
      } catch {
        setState(defaultState);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const events = useMemo(() => [...state.createdEvents, ...EVENT_SOURCE], [state.createdEvents]);

  const recommendations = useMemo(() => {
    const byArea = PEOPLE_SOURCE.filter((person) => {
      if (state.selectedArea === 'Local') {
        return person.area === 'Local';
      }
      return person.area === state.selectedArea || person.area === 'Local';
    });

    return [...byArea].sort((a, b) => {
      const aMatchCount = a.interests.filter((interest) => state.selectedInterests.includes(interest)).length;
      const bMatchCount = b.interests.filter((interest) => state.selectedInterests.includes(interest)).length;
      if (bMatchCount !== aMatchCount) {
        return bMatchCount - aMatchCount;
      }
      return a.distanceKm - b.distanceKm;
    });
  }, [state.selectedArea, state.selectedInterests]);

  const value = useMemo<FrimdsContextValue>(
    () => ({
      areas: ALL_AREAS,
      events,
      selectedEventIds: state.selectedEventIds,
      selectedInterests: state.selectedInterests,
      selectedArea: state.selectedArea,
      profile: state.profile,
      recommendations,
      toggleEventSelection: (eventId: string) => {
        setState((prev) => {
          const isSelected = prev.selectedEventIds.includes(eventId);
          return {
            ...prev,
            selectedEventIds: isSelected
              ? prev.selectedEventIds.filter((id) => id !== eventId)
              : [...prev.selectedEventIds, eventId],
          };
        });
      },
      setSelectedArea: (area: string) => {
        setState((prev) => ({ ...prev, selectedArea: area }));
      },
      toggleInterest: (interest: EventCategory) => {
        setState((prev) => {
          const hasInterest = prev.selectedInterests.includes(interest);
          return {
            ...prev,
            selectedInterests: hasInterest
              ? prev.selectedInterests.filter((current) => current !== interest)
              : [...prev.selectedInterests, interest],
            profile: {
              ...prev.profile,
              interests: hasInterest
                ? prev.profile.interests.filter((current) => current !== interest)
                : Array.from(new Set([...prev.profile.interests, interest])),
            },
          };
        });
      },
      updateProfile: (next: Partial<ProfileCustomization>) => {
        setState((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...next,
          },
        }));
      },
      createEvent: (input) => {
        const newEvent: EventItem = {
          id: `custom-${Date.now()}`,
          title: input.title,
          category: input.category,
          status: 'upcoming',
          startsAt: input.startsAt,
          location: input.location,
          hostName: 'You',
          attendees: 1,
          imageThemeId: input.imageThemeId,
          animationStyleId: input.animationStyleId,
        };

        setState((prev) => ({
          ...prev,
          createdEvents: [newEvent, ...prev.createdEvents],
          selectedEventIds: [newEvent.id, ...prev.selectedEventIds],
        }));
      },
    }),
    [events, recommendations, state.profile, state.selectedArea, state.selectedEventIds, state.selectedInterests]
  );

  return <FrimdsDataContext.Provider value={value}>{children}</FrimdsDataContext.Provider>;
}

export function useFrimdsData() {
  const context = useContext(FrimdsDataContext);

  if (!context) {
    throw new Error('useFrimdsData must be used within a FrimdsDataProvider');
  }

  return context;
}
