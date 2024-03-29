import type { Meta, StoryObj } from "@storybook/react";
import SkeltonLoader from "./SkeltonLoader";

export default {
	title: "Elements/Loader/Skelton",
	argTypes: {
		direction: {
			control: {
				type: "radio",
				options: ["col", "row"],
			},
		},
	},
	component: SkeltonLoader,
} as Meta<typeof SkeltonLoader>;

type Story = StoryObj<typeof SkeltonLoader>;

export const Default: Story = {
	args: {
		direction: "col",
	},
	render: (args) => <SkeltonLoader {...args} />,
};

export const List: Story = {
	args: {
		direction: "col",
	},
	render: (args) => (
		<div className={`grid gap-7 ${args.direction === "col" && "grid-cols-3"}`}>
			<div>
				<SkeltonLoader {...args} />
			</div>
			<div>
				<SkeltonLoader {...args} />
			</div>
			<div>
				<SkeltonLoader {...args} />
			</div>
		</div>
	),
};
