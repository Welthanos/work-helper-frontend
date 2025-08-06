import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Dimensions, Alert, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Colors } from '@/src/constants/Colors';
import api from '@/src/services/api';
import { RiskDistributionItem, RiskLevel } from '@/src/types/types';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    color: (opacity = 1) => `rgba(0, 180, 219, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.8,
    decimalPlaces: 0,
}

const pieChartColors: Record<RiskLevel, string> = {
    'Baixo': Colors.green,
    'Moderado': Colors.yellow,
    'Alto': Colors.orange,
    'Crítico': Colors.red,
}

export default function ReportsScreen() {
    const [surveys, setSurveys] = useState<any[]>([]);
    const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const selectedSurveyLabel = surveys.find(s => s.id === selectedSurveyId)?.title || 'Selecionar Pesquisa...';

    useFocusEffect(
        useCallback(() => {
            const fetchSurveys = async () => {
                setLoading(true);
                setSelectedSurveyId(null);
                setReportData(null);
                try {
                    const response = await api.get('/surveys');
                    setSurveys(response.data);
                } catch {
                    Alert.alert('Erro', 'Não foi possível carregar a lista de pesquisas.');
                } finally {
                    setLoading(false);
                }
            }
            fetchSurveys();
        }, [])
    );

    useEffect(() => {
        if (!selectedSurveyId) return;
        const fetchReportData = async () => {
            setLoading(true);
            setReportData(null);
            try {
                const response = await api.get(`/reports/${selectedSurveyId}`);
                setReportData(response.data);
            } catch {
                Alert.alert('Erro de Relatório', 'Não foi possível carregar os dados para esta pesquisa.');
            } finally {
                setLoading(false);
            }
        }
        fetchReportData();
    }, [selectedSurveyId]);

    const pieChartData = reportData?.riskDistribution.map((item: RiskDistributionItem) => ({
        name: item.risk_level,
        population: parseInt(item.count, 10),
        color: pieChartColors[item.risk_level],
        legendFontColor: Colors.blueGray,
        legendFontSize: 14,
    })) || [];

    const barChartData = {
        labels: reportData?.topRecommendations.map((_: any, i: number) => `#${i + 1}`) || [],
        datasets: [{ data: reportData?.topRecommendations.map((item: any) => parseInt(item.frequency, 10)) || [] }]
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Modal
                isVisible={isPickerVisible}
                onBackdropPress={() => setPickerVisible(false)}
                style={styles.modal}
                animationIn='fadeInUp'
                animationOut='fadeOutDown'
                backdropOpacity={0.35}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Pesquisas</Text>
                    </View>

                    <ScrollView style={styles.modalList}>
                        {surveys.map((survey: any) => (
                            <Pressable
                                key={survey.id}
                                style={({ pressed }) => [styles.modalOption, pressed && { backgroundColor: Colors.altWhite }]}
                                onPress={() => {
                                    setSelectedSurveyId(survey.id);
                                    setPickerVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{survey.title}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <TouchableOpacity style={styles.selectButton} onPress={() => setPickerVisible(true)} disabled={surveys.length === 0}>
                <Text style={styles.selectButtonText} numberOfLines={1}>{selectedSurveyLabel}</Text>
                <MaterialIcons name='arrow-drop-down' size={26} color={Colors.altWhite} />
            </TouchableOpacity>

            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color={Colors.darkBlue} />
                </View>
            )}

            {!loading && !reportData && (
                <View style={styles.placeholderContainer}>
                    <Image source={require('@/src/assets/images/robot-checking.gif')} style={styles.placeholderImage} contentFit='contain' />
                </View>
            )}

            {!loading && reportData && (
                <>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Visão Geral</Text></View>
                        <View style={styles.cardContent}>
                            <View style={styles.statsContainer}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statValue}>{reportData.generalStats.total_assessments || 0}</Text>
                                    <Text style={styles.statLabel}>Avaliações</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statValue}>{Number(reportData.generalStats.average_risk || 0).toFixed(1)}%</Text>
                                    <Text style={styles.statLabel}>Risco Médio</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statValue}>{reportData.generalStats.high_risk_count || 0}</Text>
                                    <Text style={styles.statLabel}>Alto Risco</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Distribuição de Risco</Text></View>
                        <View style={styles.cardContent}>
                            {pieChartData.length > 0 ? (
                                <PieChart
                                    data={pieChartData}
                                    width={screenWidth - 60}
                                    height={220}
                                    chartConfig={chartConfig}
                                    accessor='population'
                                    backgroundColor='transparent'
                                    paddingLeft='15'
                                    absolute
                                />
                            ) : <Text style={styles.noDataText}>Sem dados de distribuição.</Text>}
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}><Text style={styles.cardHeaderText}>Principais Fatores de Risco</Text></View>
                        <View style={styles.cardContent}>
                            {barChartData.datasets[0].data.length > 0 ? (
                                <>
                                    <BarChart
                                        data={barChartData}
                                        width={screenWidth - 60}
                                        height={220}
                                        chartConfig={chartConfig}
                                        fromZero
                                        showValuesOnTopOfBars yAxisLabel='' yAxisSuffix='' />
                                    <View style={styles.legendContainer}>
                                        {reportData.topRecommendations.map((item: any, i: number) => (
                                            <View key={i} style={styles.legendItem}>
                                                <Text style={styles.legendLabel}>{`#${i + 1}: `}</Text>
                                                <Text style={styles.legendText}>{item.description}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : <Text style={styles.noDataText}>Sem recomendações geradas.</Text>}
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.altWhite,
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 15,
        gap: 20
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.cyan,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    selectButtonText: {
        fontSize: 16,
        color: Colors.deepWhite,
        flex: 1,
        fontWeight: '500',
        marginLeft: 10
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.white,
        maxHeight: '60%',
        paddingBottom: 30
    },
    modalHeader: {
        backgroundColor: Colors.cyan,
        paddingVertical: 10,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.white
    },
    modalList: {
        paddingHorizontal: 15,
    },
    modalOption: {
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: Colors.altWhite,
        paddingHorizontal: 15
    },
    modalOptionText: {
        fontSize: 16,
        color: Colors.darkBlue,
        textAlign: 'left'
    },
    card: {
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: Colors.cyan,
        paddingVertical: 10,
        paddingHorizontal: 16,
        elevation: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white
    },
    cardContent: {
        padding: 16
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statBox: {
        alignItems: 'center',
        flex: 1
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.darkBlue
    },
    statLabel: {
        fontSize: 14,
        color: Colors.darkBlue,
        marginTop: 4
    },
    noDataText: {
        textAlign: 'center',
        color: Colors.darkBlue,
        paddingVertical: 20,
        fontSize: 16
    },
    legendContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.blueGray
    },
    legendItem: {
        flexDirection: 'row',
        marginBottom: 10
    },
    legendLabel: {
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginRight: 5
    },
    legendText: {
        flex: 1,
        color: Colors.blueGray,
        lineHeight: 20
    },
    placeholderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    placeholderImage: {
        width: 200,
        height: 200,
    },
    placeholderText: {
        fontSize: 18,
        color: Colors.blueGray,
        textAlign: 'center',
        maxWidth: '80%',
        fontWeight: '500'
    }
});