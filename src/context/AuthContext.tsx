import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface AuthContextData {
    user: object | null;
    token: string | null;
    loading: boolean;
    login(credentials: object): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedToken = await SecureStore.getItemAsync('userToken');
            const storagedUser = await SecureStore.getItemAsync('userData');

            if (storagedToken && storagedUser) {
                setToken(storagedToken);
                setUser(JSON.parse(storagedUser));
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
            }
            setLoading(false);
        }
        loadStoragedData();
    }, []);

    const login = async (credentials: object) => {
        const response = await api.post('/auth/login', credentials);
        const { token: apiToken, user: apiUser } = response.data;

        setToken(apiToken);
        setUser(apiUser);

        api.defaults.headers.Authorization = `Bearer ${apiToken}`;

        await SecureStore.setItemAsync('userToken', apiToken);
        await SecureStore.setItemAsync('userData', JSON.stringify(apiUser));
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}