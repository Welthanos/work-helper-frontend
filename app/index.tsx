import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
   const router = useRouter();

   function handleLogin() {
      router.push('/(tabs)');
   }

   function goToRegisterScreen() {
      router.replace('/register');
   }

   return (
      <View style={styles.container}>
         <View style={styles.bgTop} />
         <View style={styles.formArea}>

            <View style={styles.logoWrapper}>
               <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='email' size={20} color='gray' style={styles.iconLeft} />
               <TextInput placeholder='E-mail' placeholderTextColor='gray' style={styles.input} />
            </View>

            <View style={styles.inputGroup}>
               <MaterialIcons name='lock' size={20} color='gray' style={styles.iconLeft} />
               <TextInput placeholder='Senha' placeholderTextColor='gray' secureTextEntry style={styles.input} />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
               <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.registerPrompt}>
               Não possui uma conta?{' '}
               <Text onPress={goToRegisterScreen} style={styles.registerLink}>Cadastre-se.</Text>
            </Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: `${Colors.cyan}`,
   },

   bgTop: {
      height: '25%',
      backgroundColor: `${Colors.cyan}`,
   },

   formArea: {
      flex: 1,
      backgroundColor: `${Colors.black}`,
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
      borderColor: `${Colors.cyan}`,
      zIndex: 10
   },

   logo: {
      width: 140,
      height: 140,
   },

   inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: `${Colors.cyan}`,
      borderBottomWidth: 2,
      marginBottom: 30,
   },

   iconLeft: {
      marginRight: 10,
   },

   input: {
      flex: 1,
      color: `${Colors.gray}`,
      fontSize: 16,
      paddingVertical: 10,
   },

   loginButton: {
      backgroundColor: `${Colors.cyan}`,
      paddingVertical: 9,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 15,
   },

   loginText: {
      color: `${Colors.white}`,
      fontWeight: 'bold',
      fontSize: 21,
   },

   registerPrompt: {
      color: `${Colors.white}`,
      textAlign: 'center',
      fontSize: 16,
   },

   registerLink: {
      fontWeight: 'bold',
   },
});