import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

// Component สำหรับ custom drawer content (เมนูข้างที่ปรับแต่งเอง)
export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    // DrawerContentScrollView: container ที่สามารถ scroll ได้สำหรับเนื้อหาใน drawer
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <View style={styles.headerSection}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#ffffff" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
        </View>
        <View style={styles.headerDecoration} />
      </View>

      {/* ส่วนเมนูนำทาง - แสดงรายการเมนูทั้งหมด */}
      <View style={styles.drawerItemsContainer}>
        {/* DrawerItemList: แสดงรายการเมนูที่กำหนดใน Drawer.Screen */}
        <DrawerItemList {...props} />
      </View>

      {/* ส่วนแสดงสถิติย่อ - แสดงข้อมูลสรุปแบบเร็ว */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Quick Stats</Text>
        {/* Grid สำหรับแสดงการ์ดสถิติ */}
        <View style={styles.statsGrid}>
          {/* การ์ดแสดงจำนวน Achievements */}
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={20} color="#f59e0b" />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          {/* การ์ดแสดงจำนวนวันติดต่อกัน (Streak) */}
          <View style={styles.statCard}>
            <Ionicons name="flame" size={20} color="#ef4444" />
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* ส่วน Footer - แสดงปุ่มเพิ่มเติมและข้อมูลเวอร์ชัน */}
      <View style={styles.footerSection}>
        {/* ปุ่มไปยังการตั้งค่าแอป */}
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="settings-outline" size={20} color="#64748b" />
          <Text style={styles.footerButtonText}>App Settings</Text>
        </TouchableOpacity>
        
        {/* ปุ่มไปยังหน้าช่วยเหลือและการสนับสนุน */}
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="help-circle-outline" size={20} color="#64748b" />
          <Text style={styles.footerButtonText}>Help & Support</Text>
        </TouchableOpacity>

        {/* แสดงเวอร์ชันของแอป */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  // สไตล์สำหรับเนื้อหาทั้งหมดใน drawer
  drawerContent: {
    flex: 1,
  },
  // สไตล์สำหรับส่วน header (ด้านบนสุด)
  headerSection: {
    backgroundColor: '#6366f1', // สีพื้นหลังเป็นม่วง-น้ำเงิน
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: -4, // ขยายขึ้นไปด้านบนเพื่อไม่ให้เห็นช่องว่าง
    marginHorizontal: -4,
    position: 'relative',
  },
  // Container ของรูปโปรไฟล์และข้อมูลผู้ใช้
  profileContainer: {
    flexDirection: 'row', // จัดเรียงแนวนอน
    alignItems: 'center', // จัดกึ่งกลางแนวตั้ง
    marginBottom: 15,
  },
  // สไตล์สำหรับรูปโปรไฟล์ (Avatar)
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5, // ทำให้เป็นวงกลม
    backgroundColor: '#818cf8', // สีพื้นหลังอ่อนกว่า header
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3, // ขอบสีขาว
    borderColor: '#ffffff',
    shadowColor: '#000', // เงา
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // เงาสำหรับ Android
  },
  // Container ของข้อมูลผู้ใช้ (ชื่อและอีเมล)
  userInfo: {
    marginLeft: 15, // เว้นระยะจากรูปโปรไฟล์
    flex: 1,
  },
  // สไตล์สำหรับชื่อผู้ใช้
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  // สไตล์สำหรับอีเมลผู้ใช้
  userEmail: {
    fontSize: 13,
    color: '#e0e7ff', // สีอ่อนกว่าชื่อเล็กน้อย
  },
  // ตกแต่งด้านล่างของ header ให้โค้งมน
  headerDecoration: {
    position: 'absolute',
    bottom: -20, // ยื่นลงมาเพื่อสร้างความโค้ง
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#6366f1',
    borderBottomLeftRadius: 30, // โค้งมุมล่างซ้าย
    borderBottomRightRadius: 30, // โค้งมุมล่างขวา
  },
  // Container ของรายการเมนู
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 30, // เว้นระยะจาก header
  },
  // ส่วนแสดงสถิติ
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1, // เส้นขอบด้านบน
    borderTopColor: '#e2e8f0',
  },
  // หัวข้อของส่วนสถิติ
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase', // เปลี่ยนเป็นตัวพิมพ์ใหญ่
    letterSpacing: 0.5, // เพิ่มระยะห่างระหว่างตัวอักษร
  },
  // Grid สำหรับแสดงการ์ดสถิติ
  statsGrid: {
    flexDirection: 'row', // จัดเรียงแนวนอน
    justifyContent: 'space-between',
    gap: 10, // ระยะห่างระหว่างการ์ด
  },
  // การ์ดแสดงสถิติแต่ละอัน
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc', // พื้นหลังสีเทาอ่อน
    borderRadius: 12, // มุมโค้ง
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  // ค่าตัวเลขของสถิติ
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
    marginBottom: 4,
  },
  // ป้ายชื่อของสถิติ
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
  },
  // ส่วน Footer ด้านล่างสุด
  footerSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1, // เส้นขอบด้านบน
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  // ปุ่มใน footer
  footerButton: {
    flexDirection: 'row', // ไอคอนและข้อความเรียงแนวนอน
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  // ข้อความของปุ่มใน footer
  footerButtonText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 12, // เว้นระยะจากไอคอน
    fontWeight: '500',
  },
  // Container ของเวอร์ชัน
  versionContainer: {
    alignItems: 'center', // จัดกึ่งกลาง
    marginTop: 15,
  },
  // ข้อความแสดงเวอร์ชัน
  versionText: {
    fontSize: 12,
    color: '#94a3b8', // สีเทาอ่อน
  },
});
