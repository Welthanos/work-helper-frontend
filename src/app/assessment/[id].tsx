import AssessmentCard from '@/src/components/AssessmentCard';
import FooterAddButton from '@/src/components/FooterAddButton';
import { Colors } from '@/src/constants/Colors';
import { assessments } from '@/src/constants/Data';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

export default function AssessmentScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

    const handleToggleDate = (assessmentId: string) => {
        setOpenPopoverId(prevId => (prevId === assessmentId ? null : assessmentId));
    };

    const handleNavigateToRecommendations = () => {
        setOpenPopoverId(null)
        router.push({ pathname: '/(tabs)', params: {} });
    };

    const handleEdit = (assessmentId: string) => { setOpenPopoverId(null) };
    const handleDelete = (assessmentId: string) => { setOpenPopoverId(null) };

    return (
        <View style={styles.container}>
            {assessments && assessments.length > 0 && id == '1' ? (
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