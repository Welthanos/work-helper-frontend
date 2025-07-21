import { Colors } from '@/src/constants/Colors';
import { useSurveys } from '@/src/hooks/useSurveys';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SurveyCreateScreen() {
    const {
        title, setTitle,
        description, setDescription,
        startDate, setStartDate,
        endDate, setEndDate,
        formLoading,
        saveSurvey,
    } = useSurveys();

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Título</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='title' size={20} style={styles.icon} />
                        <TextInput placeholder='Título da pesquisa...' placeholderTextColor={Colors.blueGray} style={styles.input} value={title} onChangeText={setTitle} />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <MaterialIcons name='description' size={19} style={styles.icon} />
                        <TextInput placeholder='Detalhes da pesquisa...' placeholderTextColor={Colors.blueGray} style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline numberOfLines={4} />
                    </View>
                </View>

                <View style={styles.dateFieldsContainer}>
                    <View style={[styles.fieldGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Data de Início</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name='date-range' size={20} style={styles.icon} />
                            <TextInput placeholder='DD/MM/AAAA' placeholderTextColor={Colors.blueGray} style={styles.input} value={startDate} onChangeText={setStartDate} keyboardType='numeric' maxLength={10} />
                        </View>
                    </View>

                    <View style={[styles.fieldGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Data de Fim</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name='date-range' size={20} style={styles.icon} />
                            <TextInput placeholder='DD/MM/AAAA' placeholderTextColor={Colors.blueGray} style={styles.input} value={endDate} onChangeText={setEndDate} keyboardType='numeric' maxLength={10} />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={saveSurvey} activeOpacity={0.7} disabled={formLoading}>
                    {formLoading ? <ActivityIndicator size={25} color={Colors.white} /> : <Text style={styles.submitButtonText}>Salvar</Text>}
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