import { Colors } from '@/src/constants/Colors';
import { useAssessments } from '@/src/hooks/useAssessments';
import { maskCpf } from '@/src/utils/cpfs';
import { maskDate } from '@/src/utils/dates';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AssessmentEditScreen() {
    const { surveyId, id: assessmentId } = useLocalSearchParams();
    const [isSexDropdownOpen, setSexDropdownOpen] = useState(false);
    const { formState, setFormState, formLoading, saveAssessment, isEditing } = useAssessments(surveyId as string, assessmentId as string);

    const handleFormChange = (field: keyof typeof formState, value: string | boolean) => {
        setFormState(prev => ({ ...prev, [field]: value }));

        if (field === 'worker_sex') setSexDropdownOpen(false);
    }

    if (formLoading && isEditing) return <View style={styles.loadingContainer}><ActivityIndicator size='large' color={Colors.darkBlue} /></View>

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Nome do Trabalhador</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='person' size={20} style={styles.icon} />
                        <TextInput placeholder='Nome completo' placeholderTextColor={Colors.blueGray} style={styles.input} value={formState.worker_name} onChangeText={(text) => handleFormChange('worker_name', text)} />
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>CPF</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name='badge' size={20} style={styles.icon} />
                            <TextInput placeholder='000.000.000-00' placeholderTextColor={Colors.blueGray} style={styles.input} value={maskCpf(formState.worker_cpf || '')} onChangeText={(text) => handleFormChange('worker_cpf', maskCpf(text))} keyboardType='numeric' maxLength={14} />
                        </View>
                    </View>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Sexo</Text>
                        <View>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => setSexDropdownOpen(!isSexDropdownOpen)}>
                                <MaterialIcons name={formState.worker_sex === 'M' ? 'male' : 'female'} size={20} style={styles.icon} />
                                <Text style={styles.input}>{formState.worker_sex === 'M' ? 'Masculino' : 'Feminino'}</Text>
                                <MaterialIcons name={isSexDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} style={styles.icon} />
                            </TouchableOpacity>
                            {isSexDropdownOpen && (
                                <View style={styles.dropdown}>
                                    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleFormChange('worker_sex', 'M')}>
                                        <Text style={styles.dropdownText}>Masculino</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownOption} onPress={() => handleFormChange('worker_sex', 'F')}>
                                        <Text style={styles.dropdownText}>Feminino</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Idade (anos)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ex: 35' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.worker_age ?? '')} onChangeText={(text) => handleFormChange('worker_age', text)} keyboardType='numeric' />
                        </View>
                    </View>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Peso (kg)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ex: 76.5' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.worker_weight_kg ?? '')} onChangeText={(text) => handleFormChange('worker_weight_kg', text)} keyboardType='decimal-pad' />
                        </View>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Altura (m)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ex: 1.75' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.worker_height_m ?? '')} onChangeText={(text) => handleFormChange('worker_height_m', text)} keyboardType='decimal-pad' />
                        </View>
                    </View>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Peso da Carga (kg)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ex: 15.5' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.load_weight_kg ?? '')} onChangeText={(text) => handleFormChange('load_weight_kg', text)} keyboardType='decimal-pad' />
                        </View>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Flexão de Tronco (°)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ângulo' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.trunk_flexion_angle ?? '')} onChangeText={(text) => handleFormChange('trunk_flexion_angle', text)} keyboardType='numeric' />
                        </View>
                    </View>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.label}>Rotação de Tronco (°)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Ângulo' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.trunk_rotation_angle ?? '')} onChangeText={(text) => handleFormChange('trunk_rotation_angle', text)} keyboardType='numeric' />
                        </View>
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Tempo de Serviço (anos)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Ex: 10' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.service_time_years ?? '')} onChangeText={(text) => handleFormChange('service_time_years', text)} keyboardType='numeric' />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Jornada de Trabalho (horas diárias)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Ex: 8' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.work_shift_hours ?? '')} onChangeText={(text) => handleFormChange('work_shift_hours', text)} keyboardType='numeric' />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Unitização da Carga (total de itens por vez)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Ex: 5' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.load_unitization_n ?? '')} onChangeText={(text) => handleFormChange('load_unitization_n', text)} keyboardType='numeric' />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Possui pega na embalagem?</Text>
                    <View style={styles.switchInputContainer}>
                        <Text style={styles.switchLabel}>{formState.has_package_grip ? 'Sim' : 'Não'}</Text>
                        <Switch
                            trackColor={{ false: Colors.deepWhite, true: Colors.blueGray }}
                            thumbColor={Colors.darkBlue}
                            onValueChange={(value) => handleFormChange('has_package_grip', value)}
                            value={formState.has_package_grip}
                        />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Distância Percorrida (m)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Ex: 2.5' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.distance_traveled_m ?? '')} onChangeText={(text) => handleFormChange('distance_traveled_m', text)} keyboardType='decimal-pad' />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Frequência de Levantamento (vezes/min)</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Ex: 5' placeholderTextColor={Colors.blueGray} style={styles.input} value={String(formState.lifting_frequency_per_min ?? '')} onChangeText={(text) => handleFormChange('lifting_frequency_per_min', text)} keyboardType='decimal-pad' />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Data da Avaliação</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='date-range' size={20} style={styles.icon} />
                        <TextInput placeholder='DD/MM/AAAA' placeholderTextColor={Colors.blueGray} style={styles.input} value={formState.assessment_date} onChangeText={(text) => handleFormChange('assessment_date', maskDate(text))} keyboardType='numeric' maxLength={10} />
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={saveAssessment} activeOpacity={0.7} disabled={formLoading}>
                    {formLoading ? <ActivityIndicator size={25} color={Colors.white} /> : <Text style={styles.submitButtonText}>Salvar</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 25,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    fieldWrapper: {
        flex: 1,
        marginBottom: 18,
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
        height: 46,
        backgroundColor: Colors.white,
    },
    icon: {
        color: Colors.darkBlue,
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: Colors.darkBlue,
        fontSize: 16,
    },
    switchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.darkBlue,
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 50,
    },
    switchLabel: {
        color: Colors.darkBlue,
        fontSize: 16,
    },
    dropdown: {
        position: 'absolute',
        top: 52,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        borderColor: Colors.darkBlue,
        borderWidth: 1,
        borderRadius: 4,
        zIndex: 1000,
    },
    dropdownOption: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.deepWhite,
    },
    dropdownText: {
        fontSize: 16,
        color: Colors.darkBlue,
    },
    submitButton: {
        backgroundColor: Colors.darkBlue,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 80,
    },
    submitButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 19,
    },
});