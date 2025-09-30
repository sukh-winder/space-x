import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="space-x" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
