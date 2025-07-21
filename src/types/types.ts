import { ImageSourcePropType } from 'react-native';

export type Modality = {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export type Survey = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export type Assessment = {
  id: string;
  workerName: string;
  details: { [key: string]: string };
  date: string;
}