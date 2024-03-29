import type { Meta, StoryObj } from "@storybook/react";
import TextAreaRow from ".";

export default {
	title: "Blocks/Form/TextAreaRow",
	component: TextAreaRow,
	args: {
		label: "Label",
		cols: 30,
		rows: 10,
		defaultValue: "",
		disabled: false,
		required: false,
		isInvalid: false,
    message: "error message",
    placeholder: "Placeholder",
		name: "textarea",
		id: "textarea",
	},
	argTypes: {
		label: { type: "string" },
		cols: { control: { type: "range" } },
		rows: { control: { type: "range" } },
		disabled: { type: "boolean" },
		required: { type: "boolean" },
		isInvalid: { type: "boolean" },
		defaultValue: { type: "string" },
		placeholder: { type: "string" },
		message: { type: "string" },
		name: { control: false },
		id: { control: false },
		htmlFor: { control: false },
	},
} as Meta<typeof TextAreaRow>;

export const Default: StoryObj<typeof TextAreaRow> = {
	render: (args) => <TextAreaRow {...args} />,
};
