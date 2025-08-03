import { Modality } from '../types/types';

export const sliderTexts = [
    'As avaliações dos trabalhadores são agrupadas pela modalidade do trabalho e período de pesquisa.',
    'Identifique padrões de risco no ambiente de trabalho para melhores ações preventivas.',
];

export const modalities: Modality[] = [
    { id: '1', name: 'Manuseio de carga', image: require('@/src/assets/images/to.png'), active: true },
    { id: '2', name: 'Escritório', image: require('@/src/assets/images/te.png'), active: false },
    { id: '3', name: 'Outra Modalidade', image: require('@/src/assets/images/tc.png'), active: false },
];