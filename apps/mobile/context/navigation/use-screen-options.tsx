import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Platform } from "react-native";
import { useCSSVariable, useUniwind } from "uniwind";

export function useScreenOptions(): NativeStackNavigationOptions {
  const { theme } = useUniwind();
  const isDark = theme === "dark";
  const [themeColorForeground, themeColorBackground] = useCSSVariable([
    "--color-foreground",
    "--color-background",
  ]) as [string, string];

  return {
    headerTitleAlign: "center",
    headerTransparent: true,
    headerBlurEffect: isDark ? "dark" : "light",
    headerTintColor: themeColorForeground,
    headerStyle: {
      backgroundColor: Platform.select({
        ios: undefined,
        android: themeColorBackground,
      }),
    },
    // headerTitleStyle: { fontFamily: "" },
    headerBackButtonDisplayMode: "generic",
    gestureEnabled: true,
    gestureDirection: "horizontal",
    fullScreenGestureEnabled: !isLiquidGlassAvailable(),
    contentStyle: {
      backgroundColor: themeColorBackground,
    },
  };
}
