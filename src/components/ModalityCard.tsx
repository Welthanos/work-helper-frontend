import { Colors } from '@/src/constants/Colors';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modality } from '../types/types';

interface ModalityCardProps {
    modality: Modality;
    isDisabled: boolean;
    onPress: () => void;
}

export default React.memo(function ModalityCard({ modality, isDisabled, onPress }: ModalityCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.cardImageContainer}>
                <Image source={modality.image} style={styles.cardImage} contentFit='contain' />
            </View>

            <TouchableOpacity style={[styles.cardButton, isDisabled && styles.cardButtonDisabled]} onPress={onPress} disabled={isDisabled} activeOpacity={0.8}>
                <Text style={styles.cardButtonText}>{modality.name}</Text>
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
        elevation: 5,
        marginBottom: 5,
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
        elevation: 3,
    },
    cardButtonText: {
        color: Colors.cyan,
        fontWeight: 'bold',
        fontSize: 17,
    },
    cardButtonDisabled: {
        opacity: 0.8
    }
});