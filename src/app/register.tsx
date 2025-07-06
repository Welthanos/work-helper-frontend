import { Colors } from '@/src/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';

export default function RegisterScreen() {
   const router = useRouter();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [loading, setLoading] = useState(false);

   async function handleRegister() {
      if (loading) return;

      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
         Alert.alert('Erro', 'Por favor, preencha todos os campos.');
         return;
      }

      if (password !== confirmPassword) {
         Alert.alert('Erro', 'As senhas não coincidem.');
         return;
      }

      setLoading(true);
      try {
         await new Promise(resolve => setTimeout(resolve, 1500));

         Alert.alert('Sucesso!', 'Sua conta foi criada. Faça o login para continuar.');
         router.replace('/');
      } catch (error) {
         Alert.alert('Erro no Cadastro', 'Não foi possível criar sua conta. Tente novamente.');
      } finally {
         setLoading(false);
      }
   }

   function handleNavigateToLogin() {
      router.replace('/');
   }

   return (
      <View style={styles.container}>
         <View style={styles.bgTop} />
         <View style={styles.formArea}>

            <View style={styles.logoWrapper}>
               <Image source={require('@/src/assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='person' size={20} color='gray' style={styles.iconLeft} />
               <TextInput
                  placeholder='Nome completo'
                  placeholderTextColor='gray'
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize='words'
                  textContentType='name'
               />
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
                  textContentType='newPassword'
               />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='lock' size={20} color='gray' style={styles.iconLeft} />
               <TextInput
                  placeholder='Confirmar senha'
                  placeholderTextColor='gray'
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  textContentType='newPassword'
               />
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
               {loading ? (
                  <ActivityIndicator size={28} color={Colors.white} />
               ) : (
                  <Text style={styles.registerText}>Cadastrar</Text>
               )}
            </TouchableOpacity>

            <Text style={styles.loginPrompt}>
               Já possui uma conta?{' '}
               <Text onPress={handleNavigateToLogin} style={styles.loginLink}>Faça login.</Text>
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
      height: '20%',
      backgroundColor: Colors.cyan,
   },
   formArea: {
      flex: 1,
      backgroundColor: "black",
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
   registerButton: {
      backgroundColor: Colors.cyan,
      paddingVertical: 9,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 10,
   },
   registerText: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 21,
   },
   loginPrompt: {
      color: Colors.white,
      textAlign: 'center',
      fontSize: 16,
   },
   loginLink: {
      fontWeight: 'bold',
      color: Colors.white,
   }
});