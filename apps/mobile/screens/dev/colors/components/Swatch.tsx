import { cn } from "@rawad/ui";
import { Text, View } from "react-native";

type SwatchProps = {
  name: string;
  bg: string;
  fg: string;
  label: string;
  border?: string;
};

export function Swatch({
  name,
  bg,
  fg,
  label,
  border = "border-transparent",
}: SwatchProps) {
  return (
    <View
      className={cn(
        bg,
        "border rounded-md px-4 py-3 flex-row items-center justify-between",
        border,
      )}
    >
      <Text className={cn(fg, "text-sm font-medium")}>{name}</Text>
      <Text className={cn(fg, "text-xs opacity-60")}>{label}</Text>
    </View>
  );
}
