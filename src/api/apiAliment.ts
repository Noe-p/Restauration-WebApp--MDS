import { AlimentApiType, AlimentType } from './../type/AlimentType';
import { get, post, put, remove } from './api';

export async function getAliments() {
  const response = await get('aliments');
  return response.json();
}

export async function getOneAliments(id: string) {
  const response = await get('aliments/' + id);
  return await response.json();
}

export async function getAlimentByType(type: string) {
  const response = await get('aliments/type/' + type);
  return response.json();
}

export async function addAliment(aliment: AlimentApiType) {
  await post('aliments', aliment);
}

export async function updateAliment(aliment: AlimentType) {
  await put(`aliments/${aliment._id}`, aliment);
}

export async function removeAliment(id: string) {
  await remove(`aliments/${id}`);
}
