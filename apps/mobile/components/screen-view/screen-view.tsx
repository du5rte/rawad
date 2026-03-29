import { cn } from "@rawad/ui";
import { useHeaderHeight } from "@react-navigation/elements";
import type { FC, PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends AnimatedProps<ViewProps> {
  className?: string;
}

export const ScreenView: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <Animated.View
      className={cn("flex-1 px-4", className)}
      style={[
        {
          paddingTop: headerHeight,
          paddingBottom: insets.bottom + 32,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};
