import { Colors } from '@/src/constants/Colors';
import { useAuth } from '@/src/context/AuthContext'; // 1. Importe o hook useAuth
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            'Encerrar Sessão',
            'Deseja realmente sair da conta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', onPress: () => logout(), style: 'destructive' }
            ]
        );
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.cyan,
                tabBarInactiveTintColor: Colors.deepCyan,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: Colors.black,
                },
                headerShown: true,
                headerStyle: {
                    elevation: 10,
                    shadowColor: Colors.black,
                    backgroundColor: Colors.white,
                },
                headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.5} onPress={() => router.push('/about')}>
                        <MaterialIcons size={24} name={'info-outline'} color={Colors.darkBlue} />
                    </TouchableOpacity>
                ),
            }}
        >

            <Tabs.Screen
                name='index'
                options={{
                    title: 'Início',
                    headerTitle: () => (
                        <Image source={require('@/src/assets/images/logo-text.png')} style={{ width: 140, marginLeft: 4, resizeMode: 'contain' }} />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons size={26} name='home' color={color} style={{ paddingTop: 3 }} />
                    ),
                }}
            />

            <Tabs.Screen
                name='reports'
                options={{
                    title: 'Relatórios',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons size={30} name='bar-chart' color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name='logout'
                options={{
                    title: 'Sair',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons size={24} name='logout' color={color} style={{ paddingTop: 3, paddingStart: 2 }} />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        handleLogout();
                    },
                }}
            />
        </Tabs>
    );
}