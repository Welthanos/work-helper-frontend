import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const sliderTexts = [
   'Agrupe as avaliações dos trabalhadores por modalidade do trabalho e período de pesquisa.',
   'Identifique padrões de risco no ambiente de trabalho para melhores ações preventivas.',
];

const modalities = [
   { id: '1', titulo: 'Manuseio de carga', imagem: require('@/assets/images/to.png') },
   { id: '2', titulo: 'Escritório', imagem: require('@/assets/images/te.png') },
   { id: '3', titulo: 'Outra Modalidade', imagem: require('@/assets/images/tc.png') },
];

export default function HomeScreen() {
   const router = useRouter();
   const [currentSlide, setCurrentSlide] = useState(0);

   const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
   const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderTexts.length) % sliderTexts.length);

   return (
      <View style={styles.container}>
         <View style={styles.headerCard}>
            <Image source={require('@/assets/images/robot-looking.gif')} style={styles.robotImage} contentFit='contain' />

            <View style={styles.carouselWrapper}>
               <TouchableOpacity onPress={handlePrevSlide}>
                  <MaterialIcons name='chevron-left' size={30} color={Colors.deepCyan} />
               </TouchableOpacity>

               <View style={styles.carouselItem}>
                  <Text style={styles.carouselText}>{sliderTexts[currentSlide]}</Text>
               </View>

               <TouchableOpacity onPress={handleNextSlide}>
                  <MaterialIcons name='chevron-right' size={30} color={Colors.deepCyan} />
               </TouchableOpacity>
            </View>
         </View>

         <View style={styles.modalitiesSection}>
            <View style={styles.sectionHeader}>
               <MaterialIcons name='category' size={24} color={Colors.white} />
               <Text style={styles.sectionTitle}>Modalidade do Trabalho</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardList}>
               {modalities.map((item) => (
                  <View key={item.id} style={styles.card}>

                     <View style={styles.cardImageContainer}>
                        <Image source={item.imagem} style={styles.cardImage} contentFit='contain' />
                     </View>

                     <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/')}>
                        <Text style={styles.cardButtonText}>{item.titulo}</Text>
                     </TouchableOpacity>
                  </View>
               ))}
            </ScrollView>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.cyan,
   },

   headerCard: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      height: '40%',
      paddingHorizontal: 10
   },

   robotImage: {
      width: 170,
      height: 170
   },

   carouselWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3
   },

   carouselItem: {
      flex: 1,
      backgroundColor: Colors.cyan,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexShrink: 1,
   },

   carouselText: {
      color: Colors.white,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 18
   },

   modalitiesSection: {
      paddingTop: 30,
      backgroundColor: Colors.cyan,
   },

   sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 16,
   },

   sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.white,
   },

   cardList: {
      gap: 15,
      paddingHorizontal: 15
   },

   card: {
      width: 230,
      height: 230,
      backgroundColor: Colors.cyan,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: Colors.white,
      elevation: 6,
      marginBottom: 6,
      marginLeft: 3
   },

   cardImageContainer: {
      flex: 1,
      paddingTop: 8,
   },

   cardImage: {
      width: '100%',
      height: '100%',
   },

   cardButton: {
      backgroundColor: Colors.white,
      borderRadius: 30,
      paddingVertical: 8,
      margin: 12,
      alignItems: 'center',
      elevation: 4,
   },

   cardButtonText: {
      color: Colors.cyan,
      fontWeight: 'bold',
      fontSize: 14,
   },
});
