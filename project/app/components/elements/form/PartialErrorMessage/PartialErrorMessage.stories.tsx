import type { Meta, StoryObj } from "@storybook/react";
import PartialErrorMessage from "./PartialErrorMessage";

export default {
	title: "Elements/Form/PartialErrorMessage",
	argTypes: {
		message: {
			type: "string",
		},
	},
	component: PartialErrorMessage,
} as Meta<typeof PartialErrorMessage>;

export const Default: StoryObj<typeof PartialErrorMessage> = {
	args: {
		message: "This field is required.",
	},
	render: (args) => <PartialErrorMessage {...args} />,
};
