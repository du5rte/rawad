import { ThemeProvider, useTheme } from "@react-navigation/native";
import type { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { useCSSVariable } from "uniwind";

export function NavigationThemeProvider({ children }: PropsWithChildren) {
  const navigationTheme = useTheme();
  const colorScheme = useColorScheme();

  const [background, card, text, primary, border] = useCSSVariable([
    "--color-background",
    "--color-card",
    "--color-foreground",
    "--color-primary",
    "--color-border",
  ]) as [string, string, string, string, string];

  return (
    <ThemeProvider
      value={{
        ...navigationTheme,
        dark: colorScheme === "dark",
        colors: {
          background,
          card,
          text,
          primary,
          border,
          notification: navigationTheme.colors.notification,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
}
