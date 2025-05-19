import clsx from "clsx";
import { vars } from "nativewind";
import { View } from "react-native";
import Animated, {
	useAnimatedProps,
	type SharedValue,
	interpolate,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
	className?: string;
	size: number;
	percentage: number;
	progress: SharedValue<number>;
};

const strokeWidth = 10;

const ArcAnimation = (props: Props) => {
	const radius = props.size / 2 - strokeWidth;
	const cx = props.size / 2;
	const cy = props.size / 2;

	const pathProps = useAnimatedProps(() => {
		const startAngle = -Math.PI / 4;
		const endAngle = interpolate(
			props.progress.value * props.percentage,
			[0, 1],
			[startAngle, Math.PI * 1.25],
		);

		const x1 = cx + radius * Math.cos(startAngle);
		const y1 = cy + radius * Math.sin(startAngle);
		const x2 = cx + radius * Math.cos(endAngle);
		const y2 = cy + radius * Math.sin(endAngle);

		const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

		const d = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
    `;

		return {
			d,
		};
	}, [props.size, props.progress]);

	const circleProps = useAnimatedProps(() => {
		const startAngle = -Math.PI / 4;
		const endAngle = interpolate(
			props.progress.value * props.percentage,
			[0, 1],
			[startAngle, Math.PI * 1.25],
		);

		const x = cx + radius * Math.cos(endAngle);
		const y = cy + radius * Math.sin(endAngle);

		return {
			cx: x,
			cy: y,
			r: strokeWidth,
		};
	}, [props.size, props.progress]);

	return (
		<View
			className={clsx(props.className, "h-[--s] w-[--s]")}
			style={vars({ "--s": props.size })}
		>
			<Svg width={props.size} height={props.size}>
				<AnimatedPath
					animatedProps={pathProps}
					stroke="#FFF"
					strokeWidth={strokeWidth}
					fill="none"
					strokeLinecap="round"
				/>
				<AnimatedCircle animatedProps={circleProps} stroke="none" fill="#FFF" />
			</Svg>
		</View>
	);
};

export default ArcAnimation;
