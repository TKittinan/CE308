import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          title: "Product Details",
          headerShown: true,
          headerStyle: { backgroundColor: "#1E3A8A" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
