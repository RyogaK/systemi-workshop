const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// metro.config.js
const {
	wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

module.exports = getDefaultConfig(__dirname);

module.exports = withNativeWind(module.exports, { input: "./app/global.css" });
module.exports = wrapWithReanimatedMetroConfig(module.exports);
