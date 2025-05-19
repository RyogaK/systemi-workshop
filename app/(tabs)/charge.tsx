import GradientBackground from "@/components/ui/GradientBackground";
import { Text } from "react-native";

export default function Charge() {
	return (
		<GradientBackground className="flex-1 items-center justify-center">
			<Text className="font-bold text-3xl text-white">充電</Text>
		</GradientBackground>
	);
}
