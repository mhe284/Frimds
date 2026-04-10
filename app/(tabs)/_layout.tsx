import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, View, type ImageSourcePropType } from 'react-native';

import { HapticTab } from '../../components/haptic-tab';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../hooks/use-auth';
import { useColorScheme } from '../../hooks/use-color-scheme';

const homeTabIcon = require('../../assets/images/tabicons/Home Icon.png');
const exploreTabIcon = require('../../assets/images/tabicons/Explore Icon.png');
const profileTabIcon = require('../../assets/images/tabicons/Profile Icon.png');

function TabIcon({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <Image
      source={source}
      style={{
        width: 28,
        height: 28,
        opacity: focused ? 1 : 0.6,
      }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon source={homeTabIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon source={exploreTabIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon source={profileTabIcon} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
