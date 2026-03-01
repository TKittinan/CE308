import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from '../components/CustomDrawerContent';

// Component หลักสำหรับ layout ของ Drawer Navigation
export default function DrawerLayout() {
  return (
    // GestureHandlerRootView: container หลักที่จำเป็นสำหรับการทำงานของ gesture
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        // กำหนด custom drawer content แทนของเริ่มต้น
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        // screenOptions: ตั้งค่าทั่วไปสำหรับทุกหน้าจอใน Drawer
        screenOptions={{
          drawerActiveTintColor: '#6366f1',
          drawerInactiveTintColor: '#64748b',
          drawerActiveBackgroundColor: '#eef2ff',
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
            marginLeft: -5,
          },
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: 280, 
          },
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        {/* หน้าจอ Home - หน้าแรกของแอป */}
        <Drawer.Screen
          name="index" 
          options={{
            drawerLabel: 'Home', // ชื่อที่แสดงในเมนู drawer
            title: 'Home', // ชื่อที่แสดงใน header
            // ไอคอนที่แสดงข้างเมนู
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        {/* หน้าจอ Profile - แสดงข้อมูลโปรไฟล์ผู้ใช้ */}
        <Drawer.Screen
          name="profile" 
          options={{
            drawerLabel: 'Profile',
            title: 'My Profile',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        {/* หน้าจอ Settings - การตั้งค่าแอป */}
        <Drawer.Screen
          name="settings" 
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
        {/* หน้าจอ About - ข้อมูลเกี่ยวกับแอป */}
        <Drawer.Screen
          name="about" 
          options={{
            drawerLabel: 'About',
            title: 'About Us',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
