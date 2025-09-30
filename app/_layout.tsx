import ErrorBoundary from "@/components/ErrorBoundary";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <ErrorBoundary>
        <Stack>
          <Stack.Screen name="(space-x)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={DefaultTheme.dark ? "light" : "dark"} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
