import { Text, View } from "react-native";
import { ScreenScrollView } from "@/components/screen-scroll-view";
import { Swatch } from "./components/Swatch";

const tokens = [
  {
    group: "Base",
    swatches: [
      {
        name: "background",
        bg: "bg-background",
        fg: "text-foreground",
        label: "background / foreground",
        border: "border-border",
      },
      {
        name: "foreground",
        bg: "bg-foreground",
        fg: "text-background",
        label: "foreground / background",
      },
    ],
  },
  {
    group: "Card",
    swatches: [
      {
        name: "card",
        bg: "bg-card",
        fg: "text-card-foreground",
        label: "card / card-foreground",
        border: "border-border",
      },
    ],
  },
  {
    group: "Primary",
    swatches: [
      {
        name: "primary",
        bg: "bg-primary",
        fg: "text-primary-foreground",
        label: "primary / primary-foreground",
      },
      {
        name: "secondary",
        bg: "bg-secondary",
        fg: "text-secondary-foreground",
        label: "secondary / secondary-foreground",
      },
    ],
  },
  {
    group: "Muted & Accent",
    swatches: [
      {
        name: "muted",
        bg: "bg-muted",
        fg: "text-muted-foreground",
        label: "muted / muted-foreground",
      },
      {
        name: "accent",
        bg: "bg-accent",
        fg: "text-accent-foreground",
        label: "accent / accent-foreground",
      },
    ],
  },
  {
    group: "Semantic",
    swatches: [
      {
        name: "success",
        bg: "bg-success",
        fg: "text-success-foreground",
        label: "success / success-foreground",
      },
      {
        name: "destructive",
        bg: "bg-destructive",
        fg: "text-destructive-foreground",
        label: "destructive / destructive-foreground",
      },
    ],
  },
  {
    group: "Border & Input",
    swatches: [
      {
        name: "border",
        bg: "",
        fg: "text-foreground",
        border: "border-border",
        label: "border",
      },
      {
        name: "input",
        bg: "",
        fg: "text-foreground",
        border: "border-input",
        label: "input",
      },
      {
        name: "ring",
        bg: "",
        fg: "text-foreground",
        label: "ring",
        border: "border-ring",
      },
    ],
  },
];

export function ColorsScreen() {
  return (
    <ScreenScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-8"
    >
      <Text className="text-2xl font-semibold text-foreground">Colors</Text>

      {tokens.map(({ group, swatches }) => (
        <View key={group} className="gap-3">
          <Text className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {group}
          </Text>

          <View className="gap-2">
            {swatches.map(({ name, bg, fg, label, border }) => (
              <Swatch
                key={name}
                name={name}
                bg={bg}
                fg={fg}
                label={label}
                border={border}
              />
            ))}
          </View>
        </View>
      ))}
    </ScreenScrollView>
  );
}
