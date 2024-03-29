import type { Meta, StoryObj } from "@storybook/react";
import SelectField from ".";

export default {
	title: "Elements/Form/SelectField",
	component: SelectField,
	args: {
		options: [
			{ value: "1", label: "Option 1" },
			{ value: "2", label: "Option 2" },
			{ value: "3", label: "Option 3" },
		],
		required: true,
		placeholder: "Select an option",
		disabled: false,
		isInvalid: false,
		name: "select",
		id: "select",
	},
	argTypes: {
		name: {
			control: false,
		},
		id: {
			control: false,
		},
		placeholder: {
			type: "string",
		},
		disabled: {
			type: "boolean",
		},
		isInvalid: {
			type: "boolean",
		},
	},
} as Meta<typeof SelectField>;

export const Default: StoryObj<typeof SelectField> = {
	render: (args) => <SelectField {...args} />,
};
