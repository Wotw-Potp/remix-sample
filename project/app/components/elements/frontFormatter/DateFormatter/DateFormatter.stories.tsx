import type { Meta, StoryObj } from "@storybook/react";
import DateFormatter from ".";

export default {
	title: "Elements/FrontFormatter/DateFormatter",
	component: DateFormatter,
	args: {
		date: new Date(),
	},
} as Meta<typeof DateFormatter>;

export const Default: StoryObj<typeof DateFormatter> = {
	render: (args) => <DateFormatter {...args} />,
};
