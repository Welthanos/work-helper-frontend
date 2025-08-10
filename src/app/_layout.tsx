import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { AuthProvider, useAuth } from '../context/AuthContext';

function InitialLayout() {
   const { token, loading } = useAuth();
   const router = useRouter();
   const segments = useSegments();

   useEffect(() => {
      if (loading) return;
      const inAuthGroup = segments[0] === '(auth)';

      if (token && inAuthGroup) router.replace('/(tabs)');
      else if (!token && !inAuthGroup) router.replace('/(auth)');

   }, [token, loading]);

   return (
      <Stack>
         <Stack.Screen name='(auth)' options={{ headerShown: false }} />
         <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

         <Stack.Screen name='survey/index' options={{ headerShown: true, title: 'Pesquisas' }} />
         <Stack.Screen name='survey/create' options={{ headerShown: true, title: 'Criar Pesquisa' }} />
         <Stack.Screen name='survey/edit/[id]' options={{ headerShown: true, title: 'Editar Pesquisa' }} />

         <Stack.Screen name='assessment/[id]/index' options={{ headerShown: true, title: 'Avaliações' }} />
         <Stack.Screen name='assessment/create' options={{ headerShown: true, title: 'Criar Avaliação' }} />
         <Stack.Screen name='assessment/edit/[id]' options={{ headerShown: true, title: 'Editar Avaliação' }} />
         <Stack.Screen name='assessment/[id]/recommendations' options={{ headerShown: true, title: 'Recomendações' }} />

         <Stack.Screen name='about' options={{ headerShown: true, title: 'Sobre' }} />
      </Stack>
   );
}

export default function RootLayout() {

   useEffect(() => {
      NavigationBar.setButtonStyleAsync('dark');
   }, []);

   return (
      <AuthProvider>
         <InitialLayout />
      </AuthProvider>
   );
}