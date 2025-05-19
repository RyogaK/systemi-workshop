import useColors from "@/hooks/useColors";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { vars } from "nativewind";
import { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type Props = {
	className?: string;
	isCharging?: boolean;
	disabled?: boolean;
	onChargeStart?: () => void;
};

const height = 64;
const width = 240;
const padding = 4;

const r = width - height;
const l = 0;

export function ChargeSlider(props: Props) {
	const colors = useColors();

	const onDone = useCallback(() => {
		props.onChargeStart?.();
	}, [props.onChargeStart]);

	const x0 = props.isCharging ? r : l;

	const dragOrigin = useSharedValue(x0);
	const position = useSharedValue(x0);

	useEffect(() => {
		position.value = x0;
	}, [x0, position]);

	const panGesture = Gesture.Pan()
		.enabled(!props.disabled)
		.onBegin(() => {
			dragOrigin.value = position.value;
		})
		.onUpdate((event) => {
			position.value = Math.max(
				l,
				Math.min(dragOrigin.value + event.translationX, r),
			);
		})
		.onEnd(() => {
			if (position.value >= r) {
				position.value = r;
				if (!props.isCharging) {
					runOnJS(onDone)();
				}
			} else if (position.value <= l) {
				position.value = l;
				if (props.isCharging) {
					runOnJS(onDone)();
				}
			} else {
				position.value = withTiming(x0);
			}
		});

	const knobPositionStyle = useAnimatedStyle(
		() => ({ transform: [{ translateX: position.value }] }),
		[position],
	);

	const maskStyle = useAnimatedStyle(
		() => ({
			width: props.isCharging
				? r - position.value + height - padding * 2
				: position.value + height - padding * 2,
		}),
		[position],
	);

	return (
		<View
			className={clsx(
				"h-[--h] w-[--w] justify-center rounded-full p-[--pad]",
				props.isCharging ? "bg-charge-orange" : "bg-primary",
				props.className,
			)}
			style={vars({ "--w": width, "--h": height, "--pad": padding })}
		>
			<Text
				className={clsx(
					"absolute font-bold text-white",
					props.isCharging ? "right-[--h]" : "left-[--h]",
				)}
			>
				{props.isCharging ? "スライドで充電完了" : "スライドで充電開始"}
			</Text>
			<View className="absolute ml-[--pad] h-full w-full ">
				<Animated.View
					className={clsx(
						"absolute h-full rounded-full",
						props.isCharging ? "right-0 bg-charge-orange" : "left-0 bg-primary",
					)}
					style={maskStyle}
				/>
				<GestureDetector gesture={panGesture}>
					<Animated.View style={knobPositionStyle}>
						<View
							className="h-[--knob-size] w-[--knob-size] items-center justify-center rounded-full bg-white"
							style={vars({ "--knob-size": height - padding * 2 })}
						>
							<MaterialIcons
								name="bolt"
								size={(height - padding * 2) * 0.85}
								color={props.isCharging ? colors.primary : colors.boltColor}
							/>
						</View>
					</Animated.View>
				</GestureDetector>
			</View>
		</View>
	);
}
