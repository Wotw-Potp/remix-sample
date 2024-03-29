import type { Meta, StoryObj } from "@storybook/react";
import SectionHeading from ".";

export default {
	title: "Elements/Heading/SectionHeading",
	component: SectionHeading,
} as Meta<typeof SectionHeading>;

export const Default: StoryObj<typeof SectionHeading> = {
	args: {
		children: "Section Heading",
	},
	render: (args) => <SectionHeading {...args} />,
};
