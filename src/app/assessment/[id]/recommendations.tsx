import RecommendationCard from '@/src/components/RecommendationCard';
import { Colors } from '@/src/constants/Colors';
import { useAssessments } from '@/src/hooks/useAssessments';
import { formatDate } from '@/src/utils/dates';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RecommendationScreen() {
    const { surveyId, id: assessmentId } = useLocalSearchParams();
    const { assessment, formLoading } = useAssessments(surveyId as string, assessmentId as string);

    if (formLoading || !assessment) return (<View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.darkBlue} /></View>);

    const riskLevel = Number(assessment.calculated_risk);
    let riskColor = Colors.green

    if (riskLevel > 75) riskColor = Colors.red
    else if (riskLevel > 50) riskColor = Colors.orange;
    else if (riskLevel > 25) riskColor = Colors.yellow;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.topContent}>
                    <Text style={styles.workerName}>{assessment.worker_name}</Text>
                </View>

                <View style={styles.bottomContent}>
                    <Text style={styles.sectionTitle}>Nível de Risco Ergonômico</Text>
                    <View style={styles.riskContent}>
                        <Text style={[styles.riskValue, { color: riskColor }]}>{riskLevel}%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Plano de Ação Sugerido</Text>
                {assessment.recommendations ? (
                    <FlatList
                        data={assessment.recommendations}
                        renderItem={({ item, index }) => <RecommendationCard item={item} index={index} />}
                        keyExtractor={(item) => item.recommendation_code}
                        scrollEnabled={false}
                        contentContainerStyle={{ gap: 5 }}
                    />
                ) : (
                    <View>
                        <Text style={styles.noDataText}>Nenhuma recomendação específica foi gerada.</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.altWhite,
        padding: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    headerContainer: {
        elevation: 6,
        marginTop: 10,
        marginBottom: 18,
        marginHorizontal: 3,
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    topContent: {
        backgroundColor: Colors.cyan,
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        paddingHorizontal: 16
    },
    bottomContent: {
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 15
    },
    workerName: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.white,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.darkBlue,
        textAlign: 'center',
    },
    riskContent: {
        alignItems: 'center',
    },
    riskValue: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    recommendationsContainer: {
        marginTop: 10,
        paddingBottom: 50
    },
    recommendationsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 15,
        paddingHorizontal: 6,
    },
    noDataText: {
        fontSize: 16,
        color: Colors.blueGray,
        textAlign: 'center',
        paddingVertical: 10,
    },
});