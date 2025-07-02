import { Colors } from '@/src/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   async function handleLogin() {
      if (loading) return;
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      if (email === 'welthanos@gmail.com' && password === '12345') router.push('/(tabs)');
      else Alert.alert('Falha no Login', 'E-mail ou senha incorretos.');

      setLoading(false);
      router.push('/(tabs)');
   }

   function handleNavigateToRegister() {
      router.replace('/register');
   }

   return (
      <View style={styles.container}>
         <View style={styles.bgTop} />
         <View style={styles.formArea}>

            <View style={styles.logoWrapper}>
               <Image source={require('@/src/assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='email' size={20} color='gray' style={styles.iconLeft} />
               <TextInput
                  placeholder='E-mail'
                  placeholderTextColor='gray'
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  textContentType='emailAddress'
               />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='lock' size={20} color='gray' style={styles.iconLeft} />
               <TextInput
                  placeholder='Senha'
                  placeholderTextColor='gray'
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  textContentType='password'
               />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
               {loading ? (
                  <ActivityIndicator color={Colors.white} />
               ) : (
                  <Text style={styles.loginText}>Entrar</Text>
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
      backgroundColor: "black",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 30,
      paddingTop: 160,
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
      marginTop: 15,
   },
   loginText: {
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