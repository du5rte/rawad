import { cn } from "@rawad/ui";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Moon, Sun } from "lucide-react-native";
import type { FC } from "react";
import { Platform, TouchableOpacity } from "react-native";
import Animated, { FadeOut, ZoomIn } from "react-native-reanimated";
import { Uniwind, useUniwind, withUniwind } from "uniwind";

const StyledSunIcon = withUniwind(Sun);
const StyledMoonIcon = withUniwind(Moon);

export const ThemeToggle: FC = () => {
  const { theme } = useUniwind();
  const isLight = theme === "light";
  const toggleTheme = () => Uniwind.setTheme(isLight ? "dark" : "light");

  const isLGAvailable = isLiquidGlassAvailable();

  return (
    <TouchableOpacity
      onPressIn={() => {
        if (Platform.OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      onPressOut={() => {
        toggleTheme();
      }}
      className={cn("p-3 z-50", isLGAvailable && "px-2.5 py-2")}
      hitSlop={12}
      activeOpacity={0.8}
    >
      {isLight ? (
        <Animated.View key="moon" entering={ZoomIn} exiting={FadeOut}>
          <StyledMoonIcon size={20} className="text-foreground" />
        </Animated.View>
      ) : (
        <Animated.View key="sun" entering={ZoomIn} exiting={FadeOut}>
          <StyledSunIcon size={20} className="text-foreground" />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};
