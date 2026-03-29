import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useScreenOptions } from "@/context/navigation";
import { NavigationThemeProvider } from "../context/navigation";
import "../global.css";
import { Stack } from "expo-router";
import { Header, ThemeToggle } from "@/components/navigation";

export default function RootLayout() {
  const screenOptions = useScreenOptions();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationThemeProvider>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => <Header />,
            }}
          />
          <Stack.Screen
            name="colors"
            options={{
              headerTitle: "Colors",
              headerRight: () => <ThemeToggle />,
            }}
          />
          <Stack.Screen
            name="typography"
            options={{
              headerTitle: "Typography",
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Stack>
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  );
}
