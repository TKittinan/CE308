import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>  {/* ซ่อน header ของ Stack หลัก */}
      <Stack.Screen name="(tabs)" /> {/* รวมหน้าต่างๆ ที่อยู่ใน Tab Layout */}
      <Stack.Screen name="(auth)" /> {/* รวมหน้าต่างๆ ที่อยู่ใน Authentication Layout */}
    </Stack>
  );
}

