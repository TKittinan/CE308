import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
    const menuItems = [
        { icon: 'person-circle', title: 'แก้ไขโปรไฟล์', subtitle: 'อัปเดตข้อมูลส่วนตัว' },
        { icon: 'lock-closed', title: 'ความเป็นส่วนตัว', subtitle: 'จัดการการตั้งค่าความเป็นส่วนตัว' },
        { icon: 'notifications', title: 'การแจ้งเตือน', subtitle: 'จัดการการแจ้งเตือน' },
        { icon: 'help-circle', title: 'ช่วยเหลือ', subtitle: 'คำถามที่พบบ่อย' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={50} color="#FFFFFF" />
                </View>
                <Text style={styles.name}>ชื่อผู้ใช้</Text>
                <Text style={styles.email}>user@example.com</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>โพสต์</Text>
                </View>
                <View style={[styles.statBox, styles.statBoxMiddle]}>
                    <Text style={styles.statNumber}>345</Text>
                    <Text style={styles.statLabel}>ผู้ติดตาม</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>123</Text>
                    <Text style={styles.statLabel}>กำลังติดตาม</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem}>
                    <View style={styles.menuIconContainer}>
                        <Ionicons name={item.icon as any} size={24} color="#4F46E5" />
                    </View>
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={() => router.push('/login')}
            >
                <Ionicons name="log-out-outline" size={20} color="#DC2626" />
                <Text style={styles.logoutText}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    profileHeader: {
        backgroundColor: '#4F46E5',
        alignItems: 'center',
        padding: 32,
        paddingTop: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6366F1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#E0E7FF',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statBoxMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    menuContainer: {
        margin: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#DC2626',
    },
});
