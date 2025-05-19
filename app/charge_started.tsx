import Image from "@/components/Image";
import useColors from "@/hooks/useColors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function StartCharge() {
	const colors = useColors();

	const onPressClose = useCallback(() => {
		router.dismissAll();
		router.replace("/home");
	}, []);

	return (
		<View className="flex-1 flex-row items-center justify-center">
			<View className="h-full w-full bg-black opacity-50" />
			<View className="absolute h-full w-full items-center justify-center p-6">
				<View className="absolute h-full w-full items-center rounded bg-white py-4">
					<TouchableOpacity
						className="absolute right-0 p-4"
						onPress={onPressClose}
					>
						<AntDesign name="closecircle" size={18} color={colors.secondary} />
					</TouchableOpacity>
					<View className="m-auto items-center">
						<MaterialIcons name="check" size={120} color={colors.primary} />
						<Text className="font-bold text-lg text-primary">
							充電を開始しました
						</Text>
						<Image
							className="aspect-[1.5] w-full"
							source={require("@/assets/images/doutor.png")}
							contentFit="cover"
						/>
						<Text className="mt-10 font-bold text-2xl text-primary">
							アイスコーヒー一杯無料
						</Text>
						<Text className="mt-2 font-bold text-primary text-sm">
							2022.8.1(月)〜2022.10.31(月)
						</Text>
						<Text className="mt-3 text-primary">
							１回の提示でおひとりさま１回ご利用いただけます
						</Text>
					</View>
					<TouchableOpacity className="rounded bg-primary p-3">
						<Text className="text-sm text-white">
							今までにGETしたクーポンをみる
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
