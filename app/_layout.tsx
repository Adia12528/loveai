import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade"
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="story" />
      <Stack.Screen name="proposal" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}