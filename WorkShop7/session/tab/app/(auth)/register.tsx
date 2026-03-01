import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        router.replace('/');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>สมัครสมาชิก</Text>
            
            <TextInput
                style={styles.input}
                placeholder="ชื่อ-นามสกุล"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="อีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>สมัครสมาชิก</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>มีบัญชีอยู่แล้ว? </Text>
                <Link href="/login" asChild>
                <TouchableOpacity>
                    <Text style={styles.link}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4F46E5',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    link: {
        color: '#4F46E5',
        fontWeight: '600',
    },
});