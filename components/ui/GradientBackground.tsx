import useColors from "@/hooks/useColors";
import { LinearGradient } from "expo-linear-gradient";
import type React from "react";
import { View } from "react-native";

export default function GradientBackground({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	const colors = useColors();

	return (
		<View className={className}>
			<LinearGradient
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
				}}
				colors={[
					colors.gradientEdgeColor,
					colors.gradientMiddleColor,
					colors.gradientEdgeColor,
				]}
			/>
			{children}
		</View>
	);
}
