import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="english/(tabs)" />
      <Stack.Screen name="japanese/(tabs)" />
    </Stack>
  );
}
