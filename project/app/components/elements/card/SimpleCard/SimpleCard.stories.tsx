import type { Meta, StoryObj } from "@storybook/react";
import SimpleCard from "./SimpleCard";

export default {
	title: "Elements/Card/SimpleCard",
	component: SimpleCard,
	argTypes: {
		size: {
			control: {
				type: "select",
				options: ["sm", "lg", "full"],
			},
		},
	},
	parameters: {
		backgrounds: {
			values: [{ name: "light", value: "#f8fafc" }],
		},
	},
	decorators: [
		(story) => (
			<div className="flex flex-wrap gap-6">{story()}</div>
		),
	],
} as Meta<typeof SimpleCard>;

export const Default: StoryObj<typeof SimpleCard> = {
	args: {
		size: "sm",
	},
	render: (props) => <SimpleCard {...props}>Hello, World!</SimpleCard>,
};

export const Combined: StoryObj<typeof SimpleCard> = {
	render: () => (
		<>
			<SimpleCard size="sm">small content</SimpleCard>
			<SimpleCard size="lg">medium content</SimpleCard>
			<SimpleCard size="full">full content</SimpleCard>
		</>
	),
};
