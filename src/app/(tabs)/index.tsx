import ModalityCard from '@/src/components/ModalityCard';
import { Colors } from '@/src/constants/Colors';
import { Modality } from '@/src/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const sliderTexts = [
   'Agrupe as avaliações dos trabalhadores por modalidade do trabalho e período de pesquisa.',
   'Identifique padrões de risco no ambiente de trabalho para melhores ações preventivas.',
];

const modalities: Modality[] = [
   { id: '1', titulo: 'Manuseio de carga', imagem: require('@/src/assets/images/to.png') },
   { id: '2', titulo: 'Escritório', imagem: require('@/src/assets/images/te.png') },
   { id: '3', titulo: 'Outra Modalidade', imagem: require('@/src/assets/images/tc.png') },
];

export default function HomeScreen() {
   const router = useRouter();
   const [currentSlide, setCurrentSlide] = useState(0);

   const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
   const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderTexts.length) % sliderTexts.length);

   const handleNavigateToSurvey = (modalityId: string) => {
      router.push({ pathname: '/survey/[id]', params: { id: modalityId } });
   };

   return (
      <View style={styles.container}>
         <View style={styles.headerCard}>
            <Image source={require('@/src/assets/images/robot-looking.gif')} style={styles.robotImage} contentFit='contain' />
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

            {/* 2. Substituímos o ScrollView + map pela FlatList */}
            <FlatList
               horizontal
               data={modalities}
               renderItem={({ item }) => (
                  <ModalityCard
                     title={item.titulo}
                     imageUrl={item.imagem}
                     onPress={() => handleNavigateToSurvey(item.id)}
                  />
               )}
               keyExtractor={(item) => item.id}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.cardList}
            />
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
      // Adicionado para garantir que a seção ocupe o espaço restante
      flex: 1,
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
      paddingHorizontal: 15,
      // Adicionado para garantir que a lista tenha altura
      paddingBottom: 15,
   }
});