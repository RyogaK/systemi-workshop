import { ChargeCircle } from "@/components/ui/ChargeCircle";
import { ChargeSlider } from "@/components/ui/ChargeSlider";
import GradientBackground from "@/components/ui/GradientBackground";
import useColors from "@/hooks/useColors";
import { MaterialIcons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
	const colors = useColors();

	return (
		<GradientBackground className="flex-1 items-center justify-center">
			<View className="absolute top-safe-offset-3 right-safe-offset-3 items-center gap-2">
				<MaterialIcons
					className="rounded-full bg-bolt p-1"
					name="bolt"
					size={24}
					color={colors.primary}
				/>
				<Text className="text-sm text-white">ただいま充電中</Text>
			</View>
			<ChargeCircle percentage={1} remainingMinutes={0} />
			<ChargeSlider className="mt-3" isCharging />
			<View className="mt-6 flex-row">
				<View className="grow items-center border-secondary border-r">
					<Text className="font-bold text-3xl text-white">
						30<Text className="font-normal text-base">kW</Text>
					</Text>
					<Text className="text-white text-xs">出力電力</Text>
				</View>
				<View className="grow items-center border-secondary border-r">
					<Text className="font-bold text-3xl text-white">12:30</Text>
					<Text className="text-white text-xs">充電終了予定</Text>
				</View>
				<View className="grow items-center">
					<Text className="font-bold text-3xl text-white">
						700<Text className="font-normal text-base">円</Text>
					</Text>
					<Text className="text-white text-xs">支払予定</Text>
				</View>
			</View>
			<View className="mt-9 w-full flex-row justify-evenly">
				<Button
					icon={
						<MaterialIcons name="charging-station" size={24} color="white" />
					}
					text="使用中の充電器"
				/>
				<Button
					icon={
						<MaterialIcons name="confirmation-num" size={24} color="white" />
					}
					text="充電クーポン"
				/>
			</View>
		</GradientBackground>
	);
}

type ButtonProps = {
	icon: React.ReactNode;
	text: string;
};

function Button(props: ButtonProps) {
	return (
		<TouchableOpacity className="w-40 flex-row items-center gap-2 rounded border-2 border-secondary bg-btn-bg py-2 pl-3">
			{props.icon}
			<Text className="text-white text-xs">{props.text}</Text>
		</TouchableOpacity>
	);
}
