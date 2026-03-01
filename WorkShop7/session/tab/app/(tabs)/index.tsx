import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const features = [
        { icon: 'rocket', title: 'เริ่มต้นใช้งาน', color: '#4F46E5' },
        { icon: 'stats-chart', title: 'สถิติ', color: '#059669' },
        { icon: 'notifications', title: 'แจ้งเตือน', color: '#DC2626' },
        { icon: 'settings', title: 'ตั้งค่า', color: '#7C3AED' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>สวัสดี!</Text>
                <Text style={styles.subtitle}>ยินดีต้อนรับสู่แอปพลิเคชัน</Text>
            </View>

            <View style={styles.grid}>
                {features.map((feature, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[styles.card, { borderLeftColor: feature.color }]}
                >
                    <View style={[styles.iconContainer, { backgroundColor: feature.color + '20' }]}>
                        <Ionicons name={feature.icon as any} size={28} color={feature.color} />
                    </View>
                    <Text style={styles.cardTitle}>{feature.title}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={24} color="#4F46E5" />
                <Text style={styles.infoText}>
                    ตัวอย่าง Tab Navigation ที่ใช้ Expo Router
                </Text>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        backgroundColor: '#4F46E5',
        padding: 24,
        paddingTop: 20,
        paddingBottom: 30,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#E0E7FF',
    },
    grid: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '48%',
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    infoBox: {
        backgroundColor: '#EEF2FF',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#4338CA',
        lineHeight: 20,
    },
});
