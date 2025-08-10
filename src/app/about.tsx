import { Colors } from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ListItem = ({ text, iconName }: { text: string, iconName: any }) => (
    <View style={styles.listItemContainer}>
        <MaterialIcons name={iconName} size={24} color={Colors.darkBlue} style={styles.listItemIcon} />
        <Text style={styles.listItemText}>{text}</Text>
    </View>
);

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.headerContainer}>
                <MaterialIcons name='security' size={45} color={Colors.darkBlue} />
                <Text style={styles.title}>Sistema de Avaliação Ergonômica</Text>
                <Text style={styles.subtitle}>Uma ferramenta de apoio à saúde e segurança no trabalho, desenvolvida como um Trabalho de Conclusão de Curso (TCC).</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Como Funciona</Text>
                <Text style={styles.paragraph}>O sistema processa dados de avaliações ergonômicas para gerar recomendações personalizadas, visando minimizar os riscos de distúrbios musculoesqueléticos.</Text>
                <ListItem iconName='create' text='Crie Pesquisas personalizadas para diferentes setores ou funções.' />
                <ListItem iconName='assignment' text='Realize Avaliações detalhadas para cada trabalhador.' />
                <ListItem iconName='checklist' text='Receba Recomendações instantâneas baseadas em dados.' />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Metodologia</Text>
                <Text style={styles.paragraph}>A lógica de cálculo de risco e as recomendações são baseadas em um modelo preditivo e em diretrizes de normas reconhecidas, como a NR-17 e a ISO 11228-1, para garantir a precisão e a relevância das orientações.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Aviso Importante</Text>
                <Text style={styles.paragraph}>Este sistema é uma ferramenta de apoio e não substitui a análise e o parecer de um profissional de ergonomia qualificado.</Text>
            </View>

            <Text style={styles.version}>Versão 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.altWhite,
    },
    contentContainer: {
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginTop: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.blueGray,
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkBlue,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.blueGray,
        paddingBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        color: Colors.blueGray,
        lineHeight: 24,
        marginBottom: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    listItemIcon: {
        marginRight: 10,
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: Colors.blueGray,
        lineHeight: 24,
    },
    version: {
        fontSize: 14,
        color: Colors.blueGray,
        textAlign: 'center',
        marginBottom: 20,
    },
});