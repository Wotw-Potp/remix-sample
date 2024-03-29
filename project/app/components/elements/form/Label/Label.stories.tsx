import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

export default {
	title: "Elements/Form/Label",
	component: Label,
	argTypes: {
		htmlFor: {
			control: false,
		},
		label: {
			control: {
				type: "text",
			},
		},
	},
} as Meta<typeof Label>;

export const Default: StoryObj<typeof Label> = {
	args: {
		label: "Label",
	},
	render: (args) => <Label {...args} />,
};
