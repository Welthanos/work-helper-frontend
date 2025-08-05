import { Colors } from '@/src/constants/Colors';
import api from '@/src/services/api';
import { RiskDistributionItem, RiskLevel } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // ✅ Import correto
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    color: (opacity = 1) => `rgba(26, 35, 126, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
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
                } catch (error) {
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
            } catch (error) {
                Alert.alert('Erro de Relatório', 'Não foi possível carregar os dados para esta pesquisa.');
            } finally {
                setLoading(false);
            }
        };
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
        labels: reportData?.topRecommendations.map((_: any, index: number) => `#${index + 1}`) || [],
        datasets: [{ data: reportData?.topRecommendations.map((item: any) => parseInt(item.frequency, 10)) || [] }]
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Modal
                isVisible={isPickerVisible}
                onBackdropPress={() => setPickerVisible(false)}
                style={styles.modal}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropOpacity={0.4}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Pesquisas</Text>
                    <ScrollView>
                        {surveys.map((survey: any) => (
                            <TouchableOpacity
                                key={survey.id}
                                style={styles.modalOption}
                                onPress={() => {
                                    setSelectedSurveyId(survey.id);
                                    setPickerVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{survey.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <View style={styles.card}>
                <TouchableOpacity style={styles.pickerButton} onPress={() => setPickerVisible(true)}>
                    <Text style={styles.pickerButtonText} numberOfLines={1}>{selectedSurveyLabel}</Text>
                    <MaterialIcons name='arrow-drop-down' size={24} color={Colors.darkBlue} />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size='large' color={Colors.darkBlue} style={{ marginTop: 40 }} />}

            {!loading && reportData && (
                <>
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Visão Geral</Text>
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

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Distribuição de Risco</Text>
                        {pieChartData.length > 0 ? (
                            <PieChart
                                data={pieChartData}
                                width={screenWidth - 60}
                                height={220}
                                chartConfig={chartConfig}
                                accessor={'population'}
                                backgroundColor={'transparent'}
                                paddingLeft={'15'}
                                absolute
                            />
                        ) : <Text style={styles.noDataText}>Sem dados de distribuição.</Text>}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Principais Fatores de Risco</Text>
                        {barChartData.datasets[0].data.length > 0 ? (
                            <>
                                <BarChart
                                    data={barChartData}
                                    width={screenWidth - 60}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisLabel=''
                                    yAxisSuffix=''
                                    fromZero
                                    showValuesOnTopOfBars
                                />
                                <View style={styles.legendContainer}>
                                    {reportData.topRecommendations.map((item: any, index: number) => (
                                        <View key={index} style={styles.legendItem}>
                                            <Text style={styles.legendLabel}>{`#${index + 1}: `}</Text>
                                            <Text style={styles.legendText}>{item.description}</Text>
                                        </View>
                                    ))}
                                </View>
                            </>
                        ) : <Text style={styles.noDataText}>Sem recomendações geradas.</Text>}
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
        paddingVertical: 15,
        paddingBottom: 10
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 20,
        elevation: 3,
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.deepWhite,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: Colors.altWhite,
    },
    pickerButtonText: {
        fontSize: 16,
        color: Colors.darkBlue,
        flex: 1,
        fontWeight: '400'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        width: '85%',
        maxHeight: '70%',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        backgroundColor: Colors.white,
        borderColor: Colors.deepWhite,
    },
    modalOptionText: {
        fontSize: 16,
        color: Colors.darkBlue,
        textAlign: 'left'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 20,
        textAlign: 'center'
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
        paddingVertical: 20
    },
    legendContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.darkBlue
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
});
