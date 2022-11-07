import { PlatType } from '../type';
import { AlimentInPlatType } from './../type/PlatType';

export function findPlatInPlats(list: PlatType[], plat: PlatType): number {
  return list.findIndex((item) => {
    return item._id === plat._id;
  });
}

function isEnoughAliment(
  plat: PlatType,
  quantite: number
): AlimentInPlatType | undefined {
  let retour = undefined;
  plat.aliments.forEach((aliment) => {
    if (aliment.quantite * quantite >= aliment.detail.quantiteInStock) {
      retour = aliment;
    }
  });
  return retour;
}

export function incrementPlat(
  index: number,
  products: { plat: PlatType; quantite: number; message?: string }[]
): { plat: PlatType; quantite: number; message?: string }[] {
  const alimentEmpty = isEnoughAliment(
    products[index].plat,
    products[index].quantite
  );
  if (alimentEmpty === undefined) {
    products.splice(index, 1, {
      ...products[index],
      quantite: products[index].quantite + 1,
      message: ``,
    });
  } else {
    products.splice(index, 1, {
      ...products[index],
      message: `Il n'y a plus assez de ${alimentEmpty.detail.nom} pour passer cette commande.`,
    });
  }
  return products;
}

export function decrementPlat(
  index: number,
  products: { plat: PlatType; quantite: number; message?: string }[]
): { plat: PlatType; quantite: number; message?: string }[] {
  if (products[index].quantite <= 1) {
    products.splice(index, 1);
    return products;
  } else {
    products.splice(index, 1, {
      ...products[index],
      quantite: products[index].quantite - 1,
      message: '',
    });
    return products;
  }
}
