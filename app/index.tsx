import { ChargeSlider } from "@/components/ui/ChargeSlider";
import useColors from "@/hooks/useColors";
import { MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { vars } from "nativewind";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const chargeIconSize = 80;
const chargeIconInnerCircleMargin = 10;
const chargeIconInnerCircleSize =
	chargeIconSize - chargeIconInnerCircleMargin * 2;
const boltIconSize = chargeIconInnerCircleSize * 0.5;

export default function StartCharge() {
	const colors = useColors();

	const [isUseUsualCharge, setIsUseUsualCharge] = useState(true);

	const onPressClose = useCallback(() => {
		router.replace("/home");
	}, []);

	const onChargeStart = useCallback(() => {
		router.push("/charge_started");
	}, []);

	const onPressCheck = useCallback(() => {
		setIsUseUsualCharge((prev) => !prev);
	}, []);

	return (
		<View className={"flex-1 items-center bg-white"}>
			<View className="h-24 w-full justify-end bg-primary">
				<TouchableOpacity className="absolute p-4" onPress={onPressClose}>
					<MaterialIcons name="close" size={16} color="white" />
				</TouchableOpacity>
			</View>
			<View className="items-center">
				<View
					className="absolute top-[--margin] h-[--size] w-[--size] items-center justify-center rounded-full bg-white"
					style={vars({
						"--size": chargeIconSize,
						"--inner-circle-size": chargeIconInnerCircleSize,
						"--margin": -chargeIconSize / 2,
					})}
				>
					<View className="h-[--inner-circle-size] w-[--inner-circle-size] items-center justify-center rounded-full bg-primary">
						<MaterialIcons name="bolt" size={boltIconSize} color="white" />
					</View>
				</View>
			</View>
			<View
				className="mt-[--container-margin] grow items-center"
				style={vars({ "--container-margin": chargeIconSize / 2 })}
			>
				<Text className="font-bold text-2xl text-primary">充電を開始する</Text>
				<Text className="mt-6 font-bold text-lg text-primary">
					あと
					<Text className="text-2xl">2</Text>
					回の充電で来月も
					<Text className="text-yellow-500">GOLD会員</Text>
					です
				</Text>
				<ChargeSlider className="mt-6" onChargeStart={onChargeStart} />
				<Text className="mt-2 font-bold text-orange-600 text-sm">
					プラグが接続されているか確認してください
				</Text>
				<TouchableOpacity
					className="mt-10 flex-row gap-4"
					onPress={onPressCheck}
				>
					<Checkbox
						className="pointer-events-none"
						color={colors.primary}
						value={isUseUsualCharge}
					/>
					<Text className="font-bold text-primary">いつもの充電で充電する</Text>
				</TouchableOpacity>
				<View className="mt-4 flex-row">
					<View className="mx-4 flex-grow items-center justify-center bg-secondary p-4">
						<Text className="font-bold text-primary">スタシオン横浜中央</Text>
						<Text className="text-primary text-sm">
							〒105-0011 神奈川県横浜市中区千歳町２ー１０
						</Text>
					</View>
				</View>
				<View className="mx-4 mt-4 flex-row">
					<View className="flex-grow items-center border-secondary border-r">
						<Text className="font-bold text-3xl text-primary">
							30<Text className="font-normal text-lg">kW</Text>
						</Text>
						<Text className="font-bold text-primary text-xs">出力電力</Text>
					</View>
					<View className="flex-grow items-center border-secondary border-r">
						<Text className="font-bold text-3xl text-primary">
							30<Text className="font-normal text-lg">kW</Text>
						</Text>
						<Text className="font-bold text-primary text-xs">充電時間</Text>
					</View>
					<View className="flex-grow items-center">
						<MaterialIcons name="power" size={32} color={colors.grayIcon} />
						<Text className="font-bold text-primary text-xs">
							コネクタタイプ
						</Text>
					</View>
				</View>
				<Text className="mt-4 font-bold text-primary">
					決済方法: いつものクレジットカード
				</Text>
				<Text className="mt-1 font-bold text-primary text-sm">
					xxxx - xxxx - xxxx - 0000
				</Text>
				<View className="mt-auto flex-row pb-safe">
					<View className="grow flex-row bg-secondary py-3">
						<View className="flex-grow items-center border-white border-r">
							<Text className="font-bold text-primary">前回の利用日</Text>
							<Text className="font-bold text-2xl text-primary">6/30</Text>
						</View>
						<View className="flex-grow items-center border-white border-r">
							<Text className="font-bold text-primary">前回の利用金額</Text>
							<Text className="font-bold text-2xl text-primary">6,000円</Text>
						</View>
						<View className="flex-grow items-center">
							<Text className="font-bold text-primary">前回の充電時間</Text>
							<Text className="font-bold text-2xl text-primary">20分</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
