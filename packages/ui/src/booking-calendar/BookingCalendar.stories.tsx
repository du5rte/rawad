import { g63Rates } from "@rawad/mocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookingCalendar } from ".";

const meta: Meta<typeof BookingCalendar> = {
  component: BookingCalendar,
  args: {
    vehicleRates: g63Rates,
    discounts: [],
  },
};

export default meta;

type Story = StoryObj<typeof BookingCalendar>;

export const Default: Story = {};

export const WithDiscount: Story = {
  args: {
    discounts: [
      {
        type: "percentage",
        value: { value: "10" },
        description: "10% promo discount",
      },
    ],
  },
};
