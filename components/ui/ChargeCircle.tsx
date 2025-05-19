import ArcAnimation from "@/components/ui/ArcAnimation";
import clsx from "clsx";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
	type SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type Props = {
	className?: string;
	percentage: number;
	remainingMinutes: number;
};

export function ChargeCircle(props: Props) {
	const progress1 = useSharedValue(0);
	const progress2 = useSharedValue(0);

	useLayoutEffect(() => {
		progress1.value = withTiming(1, { duration: 2000 }, () => {
			progress2.value = withTiming(1, { duration: 500 });
		});
	}, [progress1, progress2]);

	const actuallyPercentageStyle = useAnimatedStyle(
		() => ({
			opacity: Math.min(0.5, Math.max(0, progress2.value - 0.5)) * 2,
		}),
		[progress2],
	);

	const dialStyle = useAnimatedStyle(
		() => ({
			opacity: Math.max(0, 0.5 - progress2.value) * 2,
		}),
		[progress2],
	);

	return (
		<View className={clsx(props.className, "items-center")}>
			<Text className="absolute mt-1 ml-1 text-3xl text-white">Charging</Text>
			<ArcAnimation
				size={220}
				percentage={props.percentage}
				progress={progress1}
			/>
			<View className="-translate-y-1/2 absolute top-1/2 items-center">
				<View className="mt-4 flex-row items-end">
					<View className="items-center">
						<Animated.Text
							className="text-6xl text-white"
							style={actuallyPercentageStyle}
						>
							{Math.round(props.percentage * 100)}
						</Animated.Text>
						<Animated.View
							className="absolute flex-row overflow-hidden"
							style={dialStyle}
						>
							<Dial progress={progress1} invert />
							<Dial progress={progress1} />
						</Animated.View>
					</View>
					<Text className="ml-2 text-2xl text-white">%</Text>
				</View>
				<Text className="mt-2 text-white text-xl">
					残り
					<Animated.Text
						className="text-2xl text-white"
						style={actuallyPercentageStyle}
					>
						{props.remainingMinutes}
					</Animated.Text>
					分
				</Text>
			</View>
		</View>
	);
}

type DialProps = {
	progress: SharedValue<number>;
	invert?: boolean;
};

const digits = Array.from({ length: 10 }, (_, i) => i);

function Dial(props: DialProps) {
	const style = useAnimatedStyle(
		() => ({
			transform: [
				{
					translateY: props.invert
						? `${(props.progress.value - 1) * 90}%`
						: `${-props.progress.value * 90}%`,
				},
			],
		}),
		[props.progress, props.invert],
	);

	return (
		<View className="overflow-hidden">
			<Text className="text-6xl text-transparent">0</Text>{" "}
			{/* Fake text to set the height */}
			<Animated.View className="absolute" style={style}>
				{digits.map((digit, index) => (
					<Text key={digit} className="text-6xl text-white">
						{digit}
					</Text>
				))}
			</Animated.View>
		</View>
	);
}
