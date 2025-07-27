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