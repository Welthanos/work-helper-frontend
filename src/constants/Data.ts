import { Assessment, Modality, Survey } from "../types/types";

export const sliderTexts = [
    'As avaliações dos trabalhadores são agrupadas pela modalidade do trabalho e período de pesquisa.',
    'Identifique padrões de risco no ambiente de trabalho para melhores ações preventivas.',
];

export const modalities: Modality[] = [
    { id: '1', title: 'Manuseio de carga', image: require('@/src/assets/images/to.png') },
    { id: '2', title: 'Escritório', image: require('@/src/assets/images/te.png') },
    { id: '3', title: 'Outra Modalidade', image: require('@/src/assets/images/tc.png') },
];

export const assessments: Assessment[] = [
    {
        id: '1', workerName: 'Welthanos del Oro', date: '01/03/2023',
        details: {
            'Sexo': 'Masculino', 'Idade': '26 anos', 'Altura': '1,75 m', 'Peso': '86kg', 'Tempo de serviço': '2 anos',
            'Jornada de trabalho': '8 horas', 'Unitização de cargas': '400N', 'Pega da embalagem': 'Não possui',
            'Peso da carga': '25kg', 'Distância percorrida': '2m', 'Frequência de levantamento': '5/min',
            'Ângulo de flexão do tronco': '25°', 'Ângulo de rotação do tronco': '10°', 'Risco calculado': '100%',
        }
    },
    {
        id: '2', workerName: 'Killer Queen dos Santos', date: '01/03/2023',
        details: {
            'Sexo': 'Masculino', 'Idade': '35 anos', 'Altura': '1,75 m', 'Peso': '86kg', 'Tempo de serviço': '2 anos',
            'Jornada de trabalho': '8 horas', 'Unitização de cargas': '400N', 'Pega da embalagem': 'Não possui',
            'Peso da carga': '25kg', 'Distância percorrida': '2m', 'Frequência de levantamento': '5/min',
            'Ângulo de flexão do tronco': '25°', 'Ângulo de rotação do tronco': '10°', 'Risco calculado': '100%',
        }
    },
    {
        id: '3', workerName: 'Tobias Forge de Almeida', date: '01/03/2023',
        details: {
            'Sexo': 'Masculino', 'Idade': '44 anos', 'Altura': '1,75 m', 'Peso': '86kg', 'Tempo de serviço': '2 anos',
            'Jornada de trabalho': '8 horas', 'Unitização de cargas': '400N', 'Pega da embalagem': 'Não possui',
            'Peso da carga': '25kg', 'Distância percorrida': '2m', 'Frequência de levantamento': '5/min',
            'Ângulo de flexão do tronco': '25°', 'Ângulo de rotação do tronco': '10°', 'Risco calculado': '100%',
        }
    },
    {
        id: '4', workerName: 'Zed dos Santos Silva', date: '01/03/2023',
        details: {
            'Sexo': 'Masculino', 'Idade': '36 anos', 'Altura': '1,75 m', 'Peso': '86kg', 'Tempo de serviço': '2 anos',
            'Jornada de trabalho': '8 horas', 'Unitização de cargas': '400N', 'Pega da embalagem': 'Não possui',
            'Peso da carga': '25kg', 'Distância percorrida': '2m', 'Frequência de levantamento': '5/min',
            'Ângulo de flexão do tronco': '25°', 'Ângulo de rotação do tronco': '10°', 'Risco calculado': '100%',
        }
    },
];

export const surveys: Survey[] = [
    { id: '1', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
    { id: '2', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
    { id: '3', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
    { id: '4', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
    { id: '5', title: 'Avaliação Semestral 1', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada X.', startDate: '01/03/2023', endDate: '31/08/2023' },
    { id: '6', title: 'Avaliação Semestral 2', description: 'Avaliação dos trabalhadores do setor de estoque da Filiada Y.', startDate: '15/03/2023', endDate: '15/09/2023' },
];