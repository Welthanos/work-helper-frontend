import FooterAddButton from '@/src/components/FooterAddButton';
import SurveyCard from '@/src/components/SurveyCard';
import { Colors } from '@/src/constants/Colors';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useSurveys } from '../../hooks/useSurveys';

export default function SurveyScreen() {
    const { surveys, listLoading, isRefreshing, openPopoverId, handleRefresh, handleToggleDates, handleNavigateToSurveyCreate, handleNavigateToAssessments, handleEdit, handleDelete } = useSurveys();

    if (listLoading) return <View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.darkBlue} /></View>

    return (
        <View style={styles.container}>
            {surveys && surveys.length ? (
                <FlatList
                    data={surveys}
                    renderItem={({ item }) => (
                        <SurveyCard
                            survey={item}
                            onPressViewAssessments={handleNavigateToAssessments}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isDatesVisible={openPopoverId === item.id}
                            onToggleDates={handleToggleDates}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    onRefresh={handleRefresh}
                    refreshing={isRefreshing}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Image source={require('@/src/assets/images/robot-apologizing.gif')} style={styles.robotImage} contentFit='contain' />
                </View>
            )}

            <FooterAddButton onPress={handleNavigateToSurveyCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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