import { Pressable } from "react-native";

import { useToggleTheme } from "@/hooks/useToggleTheme";

import { Text, View } from "@/components/Themed";



export default function Profile() {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <View className="flex-1 px-4 py-6">
      <Text className="mb-4">View Profile here</Text>

      <Pressable
        onPress={toggleTheme}
        className="rounded-lg bg-blue-600 px-4 py-3"
        accessibilityLabel="Toggle theme"
      >
        <Text className="text-white text-center">
          Toggle Theme (current: {theme})
        </Text>
      </Pressable>
    </View>
  );
}
