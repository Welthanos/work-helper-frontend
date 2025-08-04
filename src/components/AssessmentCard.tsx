import { Colors } from '@/src/constants/Colors';
import { Assessment } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, UIManager, Platform, GestureResponderEvent } from 'react-native';
import { formatDate } from '../utils/dates';

type AssessmentCardProps = {
    assessment: Assessment;
    isDateVisible: boolean;
    onPressViewRecommendations: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleDate: (id: string) => void;
}

export default React.memo(function AssessmentCard({ assessment, isDateVisible, onPressViewRecommendations, onEdit, onDelete, onToggleDate }: AssessmentCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        if (isDateVisible) onToggleDate(assessment.id);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    }

    const handleActionPress = (e: GestureResponderEvent, action: (id: string) => void) => {
        e.stopPropagation();
        action(assessment.id);
    }

    const detailsToDisplay = [
        { label: 'Idade', value: `${assessment.worker_age} anos` },
        { label: 'Sexo', value: assessment.worker_sex === 'M' ? 'Masculino' : 'Feminino' },
        { label: 'Peso', value: `${assessment.worker_weight_kg} kg` },
        { label: 'Altura', value: `${assessment.worker_height_m} m` },
        { label: 'Jornada de trabalho', value: `${assessment.work_shift_hours} horas` },
        { label: 'Tempo de serviço', value: `${assessment.service_time_years} anos` },
        { label: 'Peso da carga', value: `${assessment.load_weight_kg} kg` },
        { label: 'Unitização de cargas', value: `${assessment.load_unitization_n} itens` },
        { label: 'Pega da embalagem', value: assessment.has_package_grip ? 'Possui' : 'Não possui' },
        { label: 'Distância percorrida', value: `${assessment.distance_traveled_m} m` },
        { label: 'Frequência de levantamento', value: `${assessment.lifting_frequency_per_min}/min` },
        { label: 'Ângulo de flexão do tronco', value: `${assessment.trunk_flexion_angle}°` },
        { label: 'Ângulo de rotação do tronco', value: `${assessment.trunk_rotation_angle}°` },
        { label: 'Risco calculado', value: `${assessment.calculated_risk}%` },
    ];

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.header} onPress={toggleExpansion} activeOpacity={0.8}>
                <Text style={styles.headerTitle}>{assessment.worker_name}</Text>
                <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={28} color={Colors.white} />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.tableContainer}>
                    {detailsToDisplay.map((detail) => (
                        <View key={detail.label} style={styles.tableRow}>
                            <Text style={styles.tableLabelCell}>{detail.label}</Text>
                            <Text style={styles.tableValueCell}>{String(detail.value)}</Text>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.recommendationsButton} onPress={(e) => handleActionPress(e, onPressViewRecommendations)}>
                    <Text style={styles.recommendationsButtonText}>Ver recomendações</Text>
                    <MaterialIcons name='keyboard-double-arrow-right' size={20} color={Colors.white} style={{ paddingTop: 2.8 }} />
                </TouchableOpacity>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={(e) => handleActionPress(e, onToggleDate)}>
                        <MaterialIcons name='date-range' size={26} color={Colors.darkBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => handleActionPress(e, onEdit)}>
                        <MaterialIcons name='edit' size={24} color={Colors.darkBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => handleActionPress(e, onDelete)}>
                        <MaterialIcons name='delete' size={24} color={Colors.darkBlue} />
                    </TouchableOpacity>
                </View>
            </View>

            {isDateVisible && (
                <View style={styles.datePopover}>
                    <Text style={styles.datePopoverLabel}>Data da avaliação:</Text>
                    <Text style={styles.datePopoverValue}>{formatDate(assessment.assessment_date)}</Text>
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.cyan,
        borderRadius: 10,
        padding: 4,
        elevation: 3
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 2,
        paddingBottom: 5,
        marginRight: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: Colors.white
    },
    headerTitle: {
        color: Colors.white,
        fontSize: 17,
        fontWeight: '500',
    },
    tableContainer: {
        backgroundColor: Colors.white,
        marginBottom: 3
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.deepWhite,
    },
    tableLabelCell: {
        flex: 3,
        padding: 12,
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        borderRightWidth: 1,
        borderRightColor: Colors.deepWhite,
    },
    tableValueCell: {
        flex: 1,
        padding: 12,
        fontSize: 15,
        color: Colors.darkBlue,
        textAlign: 'left',
    },
    footer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        gap: 4
    },
    recommendationsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.darkBlue,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 5,
        borderRightWidth: 4,
        borderColor: Colors.cyan,
        paddingRight: 16,
        gap: 3
    },
    recommendationsButtonText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 15
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18
    },
    datePopover: {
        backgroundColor: Colors.darkBlue,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 44,
        right: 60,
        borderRadius: 5,
        padding: 12,
        gap: 5,
        elevation: 3,
        zIndex: 10,
    },
    datePopoverLabel: {
        color: Colors.white,
        fontSize: 13,
    },
    datePopoverValue: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '500',
    },
});