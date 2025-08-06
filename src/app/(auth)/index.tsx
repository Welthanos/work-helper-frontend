import { Colors } from '@/src/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        if (loading) return;

        if (!email.trim() || !password) {
            Alert.alert('Atenção!', 'E-mail e senha são obrigatórios.');
            return;
        }

        setLoading(true);

        try {
            await login({ email, password });
        } catch (error) {
            let errorMessage = 'Não foi possível fazer o login. Verifique sua conexão e tente novamente.';

            if (isAxiosError(error) && error.response) errorMessage = error.response.data.message || errorMessage;

            Alert.alert('Atenção!', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const handleNavigateToRegister = () => router.replace('/register');

    return (
        <View style={styles.container}>
            <View style={styles.bgTop} />
            <View style={styles.formArea}>

                <View style={styles.logoWrapper}>
                    <Image source={require('@/src/assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
                </View>

                <View style={styles.inputGroup}>
                    <MaterialIcons name='email' size={20} color={Colors.gray} style={styles.iconLeft} />
                    <TextInput
                        placeholder='E-mail'
                        placeholderTextColor={Colors.gray}
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        textContentType='emailAddress'
                    />
                </View>

                <View style={styles.inputGroup}>
                    <MaterialIcons name='lock' size={20} color={Colors.gray} style={styles.iconLeft} />
                    <TextInput
                        placeholder='Senha'
                        placeholderTextColor={Colors.gray}
                        secureTextEntry={!isPasswordVisible}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        textContentType='password'
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color={Colors.gray} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size={28} color={Colors.white} />
                    ) : (
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.registerPrompt}>
                    Não possui uma conta?{' '}
                    <Text onPress={handleNavigateToRegister} style={styles.registerLink}>Cadastre-se.</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cyan,
    },
    bgTop: {
        height: '25%',
        backgroundColor: Colors.cyan,
    },
    formArea: {
        flex: 1,
        backgroundColor: Colors.black,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 150,
        position: 'relative',
    },
    logoWrapper: {
        position: 'absolute',
        top: -73,
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 8,
        borderColor: Colors.cyan,
        zIndex: 10
    },
    logo: {
        width: 140,
        height: 140,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.cyan,
        borderBottomWidth: 2,
        marginBottom: 30,
    },
    iconLeft: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: Colors.gray,
        fontSize: 16,
        paddingVertical: 10,
    },
    loginButton: {
        backgroundColor: Colors.cyan,
        paddingVertical: 9,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    loginButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 21,
    },
    registerPrompt: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
    },
    registerLink: {
        fontWeight: 'bold',
        color: Colors.white,
    }
});