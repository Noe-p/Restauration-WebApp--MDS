import { AlimentType } from './AlimentType';

export interface PlatType {
  _id: string;
  nom: string;
  type: string;
  prix: number;
  date: Date;
  image: string;
  description: string;
  aliments: AlimentInPlatType[];
}

export interface AlimentInPlatType {
  detail: AlimentType;
  quantite: number;
}

export interface PlatApiType {
  nom: string;
  type: string;
  prix: number;
  date: Date;
  _id: string;
  description: string;
  image: string;
  aliments: { quantite: number; alimentId: string }[];
}

export enum PlatTypeEnum {
  PRINCIPAL = 'principal',
  ENTREE = 'entree',
  DESSERT = 'dessert',
}
