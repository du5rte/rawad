import { HeroUIProvider } from "@heroui/react";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <HeroUIProvider>
        <Story />
      </HeroUIProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
