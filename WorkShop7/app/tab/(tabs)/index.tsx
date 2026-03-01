import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MarketScreen() {
    const products = [
        { id: '1', name: 'Premium Coffee Bean', price: '450', description: 'เมล็ดกาแฟคั่วกลางจากดอยช้าง' },
        { id: '2', name: 'Green Tea Powder', price: '290', description: 'ผงมัทฉะแท้จากญี่ปุ่นเกรดพรีเมียม' },
        { id: '3', name: 'Oat Milk 1L', price: '115', description: 'นมโอ๊ตสูตรเข้มข้น ปราศจากน้ำตาล' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Market</Text>
            </View>

            <View style={styles.list}>
                {products.map((item) => (
                <TouchableOpacity 
                    key={item.id} 
                    style={styles.productCard}
                    onPress={() => router.push({
                        pathname: '/tab/details',
                        params: item
                    })}
                >
                    <View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.price}>฿{item.price}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#CDCBCB" />
                </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },
    list: { padding: 15 },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 5,
        borderLeftColor: '#1E3A8A',
        elevation: 2,
    },
    productName: { fontSize: 16, fontWeight: '600', color: '#333' },
    price: { fontSize: 14, color: '#1E3A8A', marginTop: 5, fontWeight: 'bold' },
});