import type { Meta, StoryObj } from "@storybook/react";
import PopupToast from ".";

export default {
	title: "Containers/PopupToast",
	component: PopupToast,
	args: {
		message: "This is a popup message",
		type: "success",
	},
	argTypes: {
		type: {
			control: {
				type: "select",
				options: ["success", "error", "info"],
			},
		},
		message: {
			type: "string",
		},
		closeToast: {
			control: false,
		},
	},
} as Meta<typeof PopupToast>;

type Story = StoryObj<typeof PopupToast>;

export const Default: Story = {
	render: (args) => <PopupToast {...args} />,
};
