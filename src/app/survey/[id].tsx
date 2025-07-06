import SurveyCard from '@/src/components/SurveyCard';
import { Colors } from '@/src/constants/Colors';
import { Survey } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

const surveys: Survey[] = [
   { id: '1', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
   { id: '2', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
   { id: '3', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
   { id: '4', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
   { id: '5', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
   { id: '6', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
];

export default function SurveyScreen() {
   const router = useRouter();
   const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
   const { id } = useLocalSearchParams();
   const handleToggleDates = (surveyId: string) => {
      setOpenPopoverId(prevId => (prevId === surveyId ? null : surveyId));
   };

   const handleNavigateToAssessments = () => { router.push('/(tabs)') };
   const handleEdit = (surveyId: string) => { };
   const handleDelete = (surveyId: string) => { };

   return (
      <View style={styles.container}>
         {surveys && surveys.length > 0 && id == '1' ? (
            <FlatList
               data={surveys}
               renderItem={({ item }) => (
                  <SurveyCard
                     survey={item}
                     onPressViewAssessments={handleNavigateToAssessments}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                     isDatesVisible={openPopoverId === item.id}
                     onToggleDates={() => handleToggleDates(item.id)}
                  />
               )}
               keyExtractor={(item) => item.id}
               contentContainerStyle={styles.listContent}
            />
         ) : (
            <View style={styles.emptyContainer}>
               <Image source={require('@/src/assets/images/robot-apologizing.gif')} style={styles.robotImage} contentFit='contain' />
            </View>
         )}

         <View style={styles.footerWrapper}>
            <View style={styles.footerBackground}>
               <View style={styles.buttonBackground}>
                  <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => { }}>
                     <MaterialIcons name='add' size={35} color={Colors.white} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.white,
   },
   listContent: {
      paddingTop: 15,
      paddingHorizontal: 16,
      gap: 15,
      paddingBottom: 142,
   },
   emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   },
   robotImage: {
      width: 220,
      height: 220,
      marginBottom: 20,
   },
   footerWrapper: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 130,
      alignItems: 'center',
      backgroundColor: Colors.white
   },
   footerBackground: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      backgroundColor: Colors.black,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center'
   },
   buttonBackground: {
      backgroundColor: Colors.white,
      width: 75,
      height: 75,
      borderRadius: 37.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -28
   },
   addButton: {
      backgroundColor: Colors.deepCyan,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3
   },
});