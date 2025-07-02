import { ImageSourcePropType } from 'react-native';

export type Modality = {
    id: string;
    titulo: string;
    imagem: ImageSourcePropType;
};

export type Survey = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: string;
};