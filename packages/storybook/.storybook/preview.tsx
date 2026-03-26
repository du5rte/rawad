import { I18nProvider } from "@heroui/react";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nProvider locale="en-AE">
        <Story />
      </I18nProvider>
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
