import type { Meta, StoryObj } from "@storybook/react";
import FormErrorMessage from "./FormErrorMessage";

export default {
	title: "Elements/Form/FormErrorMessage",
	component: FormErrorMessage,
	argTypes: {
		message: {
			control: "text",
		},
	},
} as Meta<typeof FormErrorMessage>;

export const Default: StoryObj<typeof FormErrorMessage> = {
	args: {
		message: "This is an error message",
	},
	render: (args) => <FormErrorMessage {...args} />,
};
