import { Stack } from "expo-router";
import { SettingsProvider } from "../context/SettingsContext";
import "@/utils/notificationService";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="english/(tabs)" />
        <Stack.Screen name="japanese/(tabs)" />
      </Stack>
    </SettingsProvider>
  );
}
