import { tv } from "tailwind-variants";

export const textVariants = tv({
  base: "text-foreground font-normal",
  variants: {
    variant: {},
    underline: {
      true: "underline decoration-solid",
      false: "",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});
