"use client";

import { Button as HeroButton } from "@heroui/react";

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export function Button({ label, onPress }: ButtonProps) {
  return <HeroButton onPress={onPress}>{label}</HeroButton>;
}
