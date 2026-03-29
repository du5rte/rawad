import { forwardRef } from "react";
import { Text, type TextProps } from "react-native";
import { textVariants } from "./text.styles";
import type { CustomTextVariants } from "./text.types";

interface CustomTextProps
  extends Omit<TextProps, "className" | "variant">,
    CustomTextVariants {
  className?: string;
}

const CustomText = forwardRef<Text, CustomTextProps>(function CustomText(
  { variant, className, children, ...props },
  ref,
) {
  return (
    <Text ref={ref} className={textVariants({ variant, className })} {...props}>
      {children}
    </Text>
  );
});

export { CustomText as Text, type CustomTextProps as TextProps };
