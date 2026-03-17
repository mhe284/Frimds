/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#FF8FB7'; // soft pink
const tintColorDark = '#FFE5F0';  // light pink accent in dark mode

export const Colors = {
  light: {
    text: '#262626',
    background: '#FFF6FA',      // very light pink background
    tint: tintColorLight,       // main accent (tabs, links)
    icon: '#8BA89B',            // soft green-grey for inactive icons
    tabIconDefault: '#8BA89B',  // inactive tab icons (greenish)
    tabIconSelected: tintColorLight, // active tab (pink)
  },
  dark: {
    text: '#FFEFF7',
    background: '#1A1C20',      // dark, slightly warm background
    tint: tintColorDark,        // pinkish accent
    icon: '#9CCFB8',            // soft green
    tabIconDefault: '#9CCFB8',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  android: {
    // Android doesn't ship a true "rounded" system font like iOS.
    // This is a friendly-looking built-in option.
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', ui-rounded, 'Hiragino Maru Gothic ProN', Meiryo, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
