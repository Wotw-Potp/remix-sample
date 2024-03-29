import type { Meta, StoryObj } from "@storybook/react";
import SidebarProfile from ".";

export default {
	title: "Layouts/Admin/Sidebar/Profile",
	parameters: {
		backgrounds: {
			default: "dark",
		},
	},
	args: {
		id: 1,
		name: "John Doe",
	},
	argTypes: {
		id: {
			type: "number",
		},
		name: {
			type: "string",
		},
	},
	component: SidebarProfile,
} as Meta<typeof SidebarProfile>;

export const Default: StoryObj<typeof SidebarProfile> = {
	render: (args) => <SidebarProfile {...args} />,
};
