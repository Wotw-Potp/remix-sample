import type { Meta, StoryObj } from "@storybook/react";
import PageHeading from ".";

export default {
	title: "Elements/Heading/PageHeading",
	component: PageHeading,
} as Meta<typeof PageHeading>;

export const Default: StoryObj<typeof PageHeading> = {
	args: {
		children: "Page Heading",
	},
	render: (args) => <PageHeading {...args} />,
};
