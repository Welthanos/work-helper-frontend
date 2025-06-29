import { Tabs, useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
   const router = useRouter();

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
               <TouchableOpacity onPress={() => router.push('/')} style={{ marginRight: 15 }} activeOpacity={0.5}>
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
                  <Image source={require('@/assets/images/logo-text.png')} style={{ width: 150, resizeMode: 'contain' }} />
               ),
               tabBarIcon: ({ color }) => (
                  <MaterialIcons size={24} name='home' color={color} />
               ),
            }}
         />

         <Tabs.Screen
            name='report'
            options={{
               title: 'Relatório',
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
                  router.dismissAll();
               },
            }}
         />
      </Tabs>
   );
}