import { Colors } from '@/src/constants/Colors';
import { Image } from 'expo-image';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ModalityCardProps = {
   title: string;
   imageUrl: ImageSourcePropType;
   onPress: () => void;
};

export default React.memo(function ModalityCard({ title, imageUrl, onPress }: ModalityCardProps) {
   return (
      <View style={styles.card}>
         <View style={styles.cardImageContainer}>
            <Image source={imageUrl} style={styles.cardImage} contentFit='contain' />
         </View>

         <TouchableOpacity style={styles.cardButton} onPress={onPress}>
            <Text style={styles.cardButtonText}>{title}</Text>
         </TouchableOpacity>
      </View>
   );
});


const styles = StyleSheet.create({
   card: {
      width: 260,
      height: 260,
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
      fontSize: 17,
   },
});