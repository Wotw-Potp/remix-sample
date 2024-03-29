import type { Meta, StoryObj } from "@storybook/react";
import Navbar from ".";

export default {
	title: "Layouts/Admin/Navbar",
	component: Navbar,
} as Meta<typeof Navbar>;

export const Default: StoryObj<typeof Navbar> = {
	render: () => <Navbar />,
};
