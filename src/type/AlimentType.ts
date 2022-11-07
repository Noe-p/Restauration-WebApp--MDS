export interface AlimentType {
  _id: string;
  nom: string;
  type: string;
  date: Date;
  quantiteInStock: number;
}

export interface AlimentApiType {
  nom: string;
  type: string;
  quantiteInStock: number;
}

export enum AlimentTypeEnum {
  CONDIMENT = 'condiment',
  LEGUME = 'legume',
  FRUIT = 'fruit',
  VIANDE = 'viande',
  FROMAGE = 'fromage',
  SAUCE = 'sauce',
  SUCRE = 'sucre',
  PATE = 'pate',
}
