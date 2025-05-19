import { useCallback } from "react";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

export function useFade(
	initialOpacity: number,
	options?: {
		onBeforeFadeIn?: () => void;
		onAfterFadeOut?: () => void;
	},
) {
	const opacity = useSharedValue(initialOpacity);

	const fadeIn = useCallback(() => {
		options?.onBeforeFadeIn?.();
		opacity.value = withTiming(1, { duration: 300 });
	}, [opacity, options?.onBeforeFadeIn]);

	const fadeOut = useCallback(() => {
		opacity.value = withTiming(0, { duration: 300 }, (finished) => {
			if (finished && options?.onAfterFadeOut) {
				runOnJS(options.onAfterFadeOut)();
			}
		});
	}, [opacity, options?.onAfterFadeOut]);

	return {
		opacity,
		fadeIn,
		fadeOut,
	};
}
