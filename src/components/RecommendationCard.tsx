import { Colors } from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RecommendationCard({ item, index }: { item: any, index: number }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialIcons name='recommend' size={24} color={Colors.cyan} />
                <Text style={styles.cardTitle}>Recomendação #{index + 1}</Text>
            </View>
            <Text style={styles.cardText}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 3,
        marginBottom: 15
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.blueGray,
        paddingBottom: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginLeft: 10,
    },
    cardText: {
        fontSize: 16,
        color: Colors.blueGray,
        lineHeight: 22,
    },
});