import { Colors } from '@/src/constants/Colors';
import { formatApiDateToMask, maskDate } from '@/src/utils/dates';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { isAxiosError } from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../../../services/api';

export default function SurveyEditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchSurveyData = async () => {
            try {
                const response = await api.get(`/surveys/${id}`);
                const survey = response.data;
                setTitle(survey.title);
                setDescription(survey.description);
                setStartDate(formatApiDateToMask(survey.start_date));
                setEndDate(formatApiDateToMask(survey.end_date));
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados da pesquisa.');
                router.back();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchSurveyData();
    }, [id]);

    async function handleUpdateSurvey() {
        if (loading) return;
        if (!title.trim() || !description.trim() || !startDate || !endDate) {
            Alert.alert('Atenção!', 'Por favor, preencha todos os campos.');
            return;
        }
        setLoading(true);

        try {
            const payload = { title, description, start_date: startDate, end_date: endDate };
            await api.put(`/surveys/${id}`, payload);

            Alert.alert('Sucesso!', 'A pesquisa foi atualizada.');
            router.back();
        } catch (error) {
            let errorMessage = 'Não foi possível atualizar a pesquisa.';
            if (isAxiosError(error) && error.response) errorMessage = error.response.data.message || errorMessage;
            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    if (initialLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={Colors.darkBlue} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Título</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='title' size={20} style={styles.icon} />
                        <TextInput
                            placeholder='Título da pesquisa...'
                            placeholderTextColor={Colors.blueGray}
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <MaterialIcons name='description' size={19} style={styles.icon} />
                        <TextInput
                            placeholder='Detalhes da pesquisa...'
                            placeholderTextColor={Colors.blueGray}
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>

                <View style={styles.dateFieldsContainer}>
                    <View style={[styles.fieldGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Data de Início</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name='date-range' size={20} style={styles.icon} />
                            <TextInput
                                placeholder='DD/MM/AAAA'
                                placeholderTextColor={Colors.blueGray}
                                style={styles.input}
                                value={startDate}
                                onChangeText={(text) => setStartDate(maskDate(text))}
                                keyboardType='numeric'
                                maxLength={10}
                            />
                        </View>
                    </View>
                    <View style={[styles.fieldGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Data de Fim</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name='date-range' size={20} style={styles.icon} />
                            <TextInput
                                placeholder='DD/MM/AAAA'
                                placeholderTextColor={Colors.blueGray}
                                style={styles.input}
                                value={endDate}
                                onChangeText={(text) => setEndDate(maskDate(text))}
                                keyboardType='numeric'
                                maxLength={10}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleUpdateSurvey} activeOpacity={0.7} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size={25} color={Colors.white} />
                    ) : (
                        <Text style={styles.submitButtonText}>Salvar</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 25,
    },
    fieldGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 7,
        marginLeft: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.darkBlue,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    icon: {
        color: Colors.darkBlue,
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: Colors.darkBlue,
        fontSize: 16,
        paddingVertical: 12,
    },
    textAreaContainer: {
        alignItems: 'flex-start',
        paddingTop: 12,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 0,
    },
    dateFieldsContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    submitButton: {
        backgroundColor: Colors.darkBlue,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 19,
    },
});