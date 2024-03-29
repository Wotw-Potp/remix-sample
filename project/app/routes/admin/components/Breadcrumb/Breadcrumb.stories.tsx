import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from ".";

export default {
	title: "Layouts/Admin/Breadcrumb",
	component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

export const Default: StoryObj<typeof Breadcrumb> = {
	args: {
		breadcrumbs: [
			{ label: "Home", path: "#" },
			{ label: "Users", path: "#" },
			{ label: "UserName", path: "#" },
		],
	},
	render: (args) => <Breadcrumb {...args} />,
};
