import type { Meta, StoryObj } from "@storybook/react";
import OverlayModal from ".";
import { useArgs } from "@storybook/preview-api";

export default {
	title: "Containers/OverlayModal",
	component: OverlayModal,
	args: {
		isOpen: true,
	},
	argTypes: {
		isOpen: {
			type: "boolean",
		},
		children: {
			control: false,
		},
	},
} as Meta<typeof OverlayModal>;

export const Default: StoryObj<typeof OverlayModal> = {
	args: {
		children: <>This is Modal Content.</>,
	},
	render: function Render(args) {
		const [, updateArgs] = useArgs();
		const handleClose = () => updateArgs({ isOpen: false });

		return <OverlayModal {...args} onCloseHandler={handleClose} />;
	},
};
