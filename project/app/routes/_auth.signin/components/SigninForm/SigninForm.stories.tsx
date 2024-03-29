import type { Meta, StoryObj } from "@storybook/react";
import SigninForm from ".";

export default {
	title: "Layouts/Auth/SigninForm",
	component: SigninForm,
	args: {
		message: "",
		errors: {
			email: undefined,
			password: undefined,
		},
	},
	argTypes: {
		message: {
			type: "string",
		},
	},
} as Meta<typeof SigninForm>;

export const Default: StoryObj<typeof SigninForm> = {
	render: (args) => <SigninForm {...args} />,
};
