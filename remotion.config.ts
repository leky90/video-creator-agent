// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import path from "path";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((config) => {
	return {
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...(config.resolve?.alias ?? {}),
				"~shared": path.resolve(__dirname, "src/shared"),
				"~lottie": path.resolve(__dirname, "public/lottie"),
			},
		},
	};
});
