import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { modalities, sliderTexts } from '@/src/constants/Datas';
import ModalityCard from '@/src/components/ModalityCard';

export default function HomeScreen() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderTexts.length);
    const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderTexts.length) % sliderTexts.length);
    const handleNavigateToSurvey = () => router.push('/survey');

    return (
        <View style={styles.container}>
            <View style={styles.headerCard}>
                <Image source={require('@/src/assets/images/robot-looking.gif')} style={styles.robotImage} contentFit='contain' />

                <View style={styles.carouselContainer}>
                    <View style={styles.carouselBackground}>
                        <Text style={styles.carouselText}>{sliderTexts[currentSlide]}</Text>
                    </View>

                    <View style={styles.carouselControls}>
                        <TouchableOpacity onPress={handlePrevSlide} style={styles.arrowButton}>
                            <MaterialIcons name='chevron-left' size={20} color={Colors.white} />
                        </TouchableOpacity>

                        <View style={styles.dotsContainer}>
                            {sliderTexts.map((_, index) => (
                                <View key={index} style={[styles.dot, currentSlide === index && styles.dotActive]} />
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleNextSlide} style={styles.arrowButton}>
                            <MaterialIcons name='chevron-right' size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.modalitiesSection}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name='category' size={24} color={Colors.white} />
                    <Text style={styles.sectionText}>Modalidade do Trabalho</Text>
                </View>

                <FlatList
                    horizontal
                    data={modalities}
                    renderItem={({ item }) => (<ModalityCard modality={item} isDisabled={!item.active} onPress={handleNavigateToSurvey} />)}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cyan,
    },
    headerCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        height: '40%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    robotImage: {
        width: 150,
        height: 150,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
    },
    carouselBackground: {
        backgroundColor: Colors.cyan,
        borderRadius: 5,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        minHeight: 110,
        borderWidth: 3,
        borderColor: Colors.lightCyan,
    },
    carouselText: {
        color: Colors.white,
        fontSize: 15,
        textAlign: 'left',
        lineHeight: 20,
        fontWeight: '500',
    },
    carouselControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10,
        paddingHorizontal: 5
    },
    arrowButton: {
        backgroundColor: Colors.darkBlue,
        borderRadius: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.deepWhite,
    },
    dotActive: {
        backgroundColor: Colors.darkBlue,
    },
    modalitiesSection: {
        paddingTop: 30,
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.white,
    },
    cardList: {
        gap: 15,
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
});