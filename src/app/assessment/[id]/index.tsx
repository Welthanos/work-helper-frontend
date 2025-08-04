import AssessmentCard from '@/src/components/AssessmentCard';
import FooterAddButton from '@/src/components/FooterAddButton';
import { Colors } from '@/src/constants/Colors';
import { useAssessments } from '@/src/hooks/useAssessments';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export default function AssessmentScreen() {
    const { id: surveyId } = useLocalSearchParams();
    const { assessments, listLoading, isRefreshing, openPopoverId, handleRefresh, handleToggleDate, handleDelete, handleNavigateToAssessmentCreate, handleEdit, handleNavigateToRecommendations, } = useAssessments(surveyId as string);

    if (listLoading) return <View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.darkBlue} /></View>

    return (
        <View style={styles.container}>
            {assessments && assessments.length > 0 ? (
                <FlatList
                    data={assessments}
                    renderItem={({ item }) => (
                        <AssessmentCard
                            assessment={item}
                            isDateVisible={openPopoverId === item.id}
                            onToggleDate={handleToggleDate}
                            onPressViewRecommendations={handleNavigateToRecommendations}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
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

            <FooterAddButton onPress={handleNavigateToAssessmentCreate} />
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