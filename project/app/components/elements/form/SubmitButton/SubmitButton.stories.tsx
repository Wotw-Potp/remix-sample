import type { Meta, StoryObj } from "@storybook/react";
import SubmitButton from "./SubmitButton";

export default {
	title: "Elements/Form/SubmitButton",
	component: SubmitButton,
	argTypes: {
		label: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
		isLoading: {
			control: "boolean",
		},
		theme: {
			control: {
				type: "select",
				options: ["default", "danger", "success"],
			},
		},
	},
} as Meta<typeof SubmitButton>;

export const Default: StoryObj<typeof SubmitButton> = {
	args: {
		label: "submit",
		disabled: false,
		isLoading: false,
	},
	render: (args) => <SubmitButton {...args} />,
};
