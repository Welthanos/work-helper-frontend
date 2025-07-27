import ModalityCard from '@/src/components/ModalityCard';
import { Colors } from '@/src/constants/Colors';
import { modalities, sliderTexts } from '@/src/constants/Datas';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
   const router = useRouter();
   const [currentSlide, setCurrentSlide] = useState(0);

   const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
   const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderTexts.length) % sliderTexts.length);

   const handleNavigateToSurvey = (modalityId: string) => {
      router.push({ pathname: '/survey/[id]', params: { id: modalityId } });
   }

   return (
      <View style={styles.container}>
         <View style={styles.headerCard}>
            <Image source={require('@/src/assets/images/robot-looking.gif')} style={styles.robotImage} contentFit='contain' />

            <View style={styles.carouselWrapper}>
               <TouchableOpacity onPress={handlePrevSlide}>
                  <MaterialIcons name='chevron-left' size={30} color={Colors.deepCyan} />
               </TouchableOpacity>

               <View style={styles.carouselBackground}>
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
               <Text style={styles.sectionText}>Modalidade do Trabalho</Text>
            </View>

            <FlatList
               horizontal
               data={modalities}
               renderItem={({ item }) => (<ModalityCard modality={item} onPress={() => handleNavigateToSurvey(item.id)} />)}
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
      paddingHorizontal: 8
   },
   robotImage: {
      width: 180,
      height: 180
   },
   carouselWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
   },
   carouselBackground: {
      backgroundColor: Colors.cyan,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexShrink: 1,
   },
   carouselText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'left',
      lineHeight: 19,
   },
   modalitiesSection: {
      marginTop: 40,
      backgroundColor: Colors.cyan,
      flex: 1,
   },
   sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 18,
      marginBottom: 22,
   },
   sectionText: {
      fontSize: 21,
      fontWeight: 'bold',
      color: Colors.white,
   },
   cardList: {
      gap: 15,
      paddingHorizontal: 18
   }
});