import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={60} color="#FFF" />
            </View>
            <Text style={styles.name}>Suki Teenoi</Text>
            <Text style={styles.email}>teenoi@gmail.com</Text>
            
            <View style={styles.badge}>
                <Text style={styles.badgeText}>Premium Member</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1E3A8A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    name: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },
    email: { fontSize: 16, color: '#666', marginTop: 5 },
    badge: {
        marginTop: 20,
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    badgeText: { color: '#1E3A8A', fontWeight: '600' }
});