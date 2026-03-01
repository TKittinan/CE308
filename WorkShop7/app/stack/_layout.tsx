import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ title: 'Details' }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="profile"
        options={{
          title: 'My Profile',
          headerShown: true,
          headerBackVisible: true,
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          headerTitleStyle: { 
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen 
        name="login"
        options={{
          title: 'Login',
          presentation: 'modal', // เปิดแบบ modal popup
          animation: 'slide_from_bottom',
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          gestureEnabled: true,
          gestureDirection: 'vertical', // เลื่อนลงเพื่อปิด
        }}
      />
    </Stack>
  );
}

