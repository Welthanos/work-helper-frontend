import FooterAddButton from '@/src/components/FooterAddButton';
import SurveyCard from '@/src/components/SurveyCard';
import { Colors } from '@/src/constants/Colors';
import { surveys } from '@/src/constants/Data';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function SurveyScreen() {
   const router = useRouter();
   const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
   const { id } = useLocalSearchParams();
   const handleToggleDates = (surveyId: string) => {
      setOpenPopoverId(prevId => (prevId === surveyId ? null : surveyId));
   };

   const handleNavigateToAssessments = (surveyId: string) => {
      setOpenPopoverId(null)
      router.push({ pathname: '/assessment/[id]', params: { id: surveyId } });
   };

   const handleEdit = (surveyId: string) => { setOpenPopoverId(null) };
   const handleDelete = (surveyId: string) => { setOpenPopoverId(null) };

   return (
      <View style={styles.container}>
         {surveys && surveys.length > 0 && id == '1' ? (
            <FlatList
               data={surveys}
               renderItem={({ item }) => (
                  <SurveyCard
                     survey={item}
                     onPressViewAssessments={() => handleNavigateToAssessments(item.id)}
                     onEdit={handleEdit}
                     onDelete={handleDelete}
                     isDatesVisible={openPopoverId === item.id}
                     onToggleDates={() => handleToggleDates(item.id)}
                  />
               )}
               keyExtractor={(item) => item.id}
               contentContainerStyle={styles.listContent}
               showsVerticalScrollIndicator={false}
            />
         ) : (
            <View style={styles.emptyContainer}>
               <Image source={require('@/src/assets/images/robot-apologizing.gif')} style={styles.robotImage} contentFit='contain' />
            </View>
         )}

         <FooterAddButton />
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
   }
});