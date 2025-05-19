import { Tabs } from "expo-router";

import FloatingCarButton from "@/components/ui/FloatingCarButton";
import useColors from "@/hooks/useColors";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
	const colors = useColors();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "white",
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.primary,
				},
			}}
		>
			<Tabs.Screen
				name="mypage"
				options={{
					title: "マイページ",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="person" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="charge"
				options={{
					title: "充電",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="bolt" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="home"
				options={{
					tabBarButton: FloatingCarButton,
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					title: "お知らせ",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="notifications" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="help"
				options={{
					title: "ヘルプ",
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="help-center" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
