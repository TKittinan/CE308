import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailsScreen() {
    const { name, price, description } = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>Product Image</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>฿{price}</Text>
                <View style={styles.divider} />
                <Text style={styles.description}>{description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    imagePlaceholder: {
        width: '100%',
        height: 300,
        backgroundColor: '#F0F4FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageText: { color: '#1E3A8A', fontSize: 16, opacity: 0.3 },
    content: { padding: 25 },
    name: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A' },
    price: { fontSize: 22, color: '#1E3A8A', marginTop: 10, fontWeight: 'bold' },
    divider: { height: 2, backgroundColor: '#1E3A8A', marginVertical: 20, opacity: 0.1 },
    description: { fontSize: 16, color: '#444', lineHeight: 24 },
});