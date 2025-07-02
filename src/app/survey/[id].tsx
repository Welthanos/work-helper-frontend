import SurveyCard from '@/src/components/SurveyCard';
import { Colors } from '@/src/constants/Colors';
import { Survey } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const surveys: Survey[] = [
   { id: '1', titulo: 'Avaliação Semestral 1', descricao: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', data: '01/03/2023', tipo: 'MMC' },
   { id: '2', titulo: 'Avaliação Semestral 2', descricao: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', data: '01/03/2023', tipo: 'MMC' },
   { id: '3', titulo: 'Avaliação Semestral 3', descricao: 'Avaliação dos trabalhadores do setor de estoque da Filiada Z.', data: '01/03/2023', tipo: 'MMC' },
   { id: '4', titulo: 'Avaliação Semestral 4', descricao: 'Avaliação dos trabalhadores do setor de estoque da Filiada W.', data: '01/03/2023', tipo: 'MMC' },
   { id: '5', titulo: 'Avaliação Semestral 5', descricao: 'Avaliação dos trabalhadores do setor de estoque da Filiada K.', data: '01/03/2023', tipo: 'MMC' },
];

export default function SurveyScreen() {
   const router = useRouter();

   function handleEdit(surveyId: string) {
      // EDITAR
   };

   function handleDelete(surveyId: string) {
      // DELETAR
   };

   return (
      <View style={styles.container}>
         <FlatList
            data={surveys}
            renderItem={({ item }) => (<SurveyCard survey={item} onEdit={handleEdit} onDelete={handleDelete} />)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
            ListFooterComponent={<View style={{ height: 100 }} />}
         />

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
   scrollContent: {
      marginTop: 15,
      paddingHorizontal: 16,
      paddingBottom: 40,
      gap: 15
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
      backgroundColor: Colors.cyan,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5
   }
});
