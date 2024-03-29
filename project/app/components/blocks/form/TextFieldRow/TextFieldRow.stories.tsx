import type { Meta, StoryObj } from "@storybook/react";
import TextFieldRow from "./TextFieldRow";

export default {
	title: "Blocks/Form/TextFieldRow",
	component: TextFieldRow,
	args: {
		placeholder: "change me",
		isInvalid: false,
		disabled: false,
		label: "label",
		message: "",
	},
	argTypes: {
		label: {
			control: {
				type: "text",
			},
		},
		type: {
			control: false,
		},
		onChange: {
			action: "changed",
		},
		isInvalid: {
			type: "boolean",
		},
		disabled: {
			type: "boolean",
		},
		defaultValue: {
			control: false,
		},
		id: {
			control: false,
		},
		name: {
			control: false,
		},
		required: {
			control: false,
		},
		className: {
			control: false,
		},
		message: {
			type: "string",
		},
	},
} as Meta<typeof TextFieldRow>;

type Story = StoryObj<typeof TextFieldRow>;

export const Text: Story = {
	args: {
		type: "text",
		label: "Text",
		id: "text",
	},
	render: (props) => <TextFieldRow {...props} />,
};

export const Email: Story = {
	args: {
		type: "email",
		label: "Email",
		id: "email",
	},
	render: (props) => <TextFieldRow {...props} />,
};

export const Password: Story = {
	args: {
		type: "password",
		label: "Password",
		id: "password",
	},
	render: (props) => <TextFieldRow {...props} />,
};
