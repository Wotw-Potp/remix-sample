import type { Preview } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";
import "../app/app.css";

const preview: Preview = {
	decorators: [withRouter],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
