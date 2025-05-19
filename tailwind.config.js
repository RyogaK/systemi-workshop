import { Colors } from "./constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				bolt: "var(--color-bolt)",
				"charge-orange": "var(--color-charge-orange)",
				"btn-bg": "var(--color-btn-bg)",
			},
		},
	},
	plugins: [
		({ addBase }) => {
			addBase({
				":root": {
					"--color-primary": Colors.default.primary,
					"--color-secondary": Colors.default.secondary,
					"--color-bolt": Colors.default.boltColor,
					"--color-charge-orange": Colors.default.chargeOrange,
					"--color-btn-bg": Colors.default.buttonBackground,
				},
			});
		},
	],
};
