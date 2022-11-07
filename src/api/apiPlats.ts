import { PlatApiType, PlatType } from '../type/PlatType';
import { get, post, put, remove } from './api';
import { getOneAliments } from './apiAliment';

function fetchAliments(
  aliments: {
    quantite: number;
    alimentId: string;
  }[]
) {
  return Promise.all(
    aliments.map(async (ali) => {
      return {
        detail: await getOneAliments(ali.alimentId),
        quantite: ali.quantite,
      };
    })
  );
}

export async function getPlats() {
  const response = await get('plats');
  const plats: PlatApiType[] = await response.json();
  const convertPlats = Promise.all(
    plats.map(async (plat) => {
      return {
        ...plat,
        aliments: await fetchAliments(plat.aliments),
      };
    })
  );
  return convertPlats;
}

export async function getOnePlat(id: string): Promise<PlatType> {
  const response = await get('plats/' + id);
  const plat: PlatApiType = await response.json();

  const aliments = await fetchAliments(plat.aliments);
  return { ...plat, aliments };
}

export async function getPlatByType(type: string) {
  const response = await get('plats/type/' + type);
  const plats: PlatApiType[] = await response.json();
  const convertPlats = Promise.all(
    plats.map(async (plat) => {
      return {
        ...plat,
        aliments: await fetchAliments(plat.aliments),
      };
    })
  );
  return convertPlats;
}

export async function addPlat(plat: PlatApiType) {
  await post('plats', plat);
}

export async function updatePlat(plat: PlatApiType) {
  await put(`plats/${plat._id}`, plat);
}

export async function removePlat(id?: string) {
  await remove(`plats/${id}`);
}
