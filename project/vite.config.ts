import { defineConfig } from "vite";
import path from "path";

export default defineConfig(() => {
	return {
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "app"),
			},
		},
	};
});
