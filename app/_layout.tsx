import "@/app/global.css";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<GestureHandlerRootView>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
							presentation: "transparentModal",
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false, animation: "none" }}
					/>
					<Stack.Screen
						name="charge_started"
						options={{
							headerShown: false,
							presentation: "transparentModal",
							animation: "fade",
						}}
					/>
				</Stack>
				<StatusBar style="light" />
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
