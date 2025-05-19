import useColors from "@/hooks/useColors";
import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { vars } from "nativewind";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = BottomTabBarButtonProps & {};

const buttonSize = 44;
const innerCircleMargin = 4;
const innerCircleSize = buttonSize - innerCircleMargin * 2;

export default function FloatingCarButton(props: Props) {
	const colors = useColors();

	return (
		<View className="pointer-events-box-none flex-1 items-center">
			<TouchableOpacity
				className="top-[--inner-circle-margin]"
				style={vars({ "--inner-circle-margin": `-${innerCircleMargin}` })}
				onPress={props.onPress}
			>
				<View
					className="h-[--button-size] w-[--button-size] items-center justify-center rounded-full bg-primary"
					style={[
						vars({ "--button-size": `${buttonSize}px` }),
						styles.outerCircleShadow,
					]}
				>
					<View
						className="h-[--inner-circle-size] w-[--inner-circle-size] items-center justify-center rounded-full bg-white"
						style={vars({ "--inner-circle-size": `${innerCircleSize}px` })}
					>
						<MaterialIcons
							className="top-[-1]"
							size={28}
							name="directions-car"
							color={colors.primary}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	outerCircleShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 20,
	},
});
