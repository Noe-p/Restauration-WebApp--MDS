import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateAliment, updatePlat } from '../../api';
import {
  decrementPlat,
  findPlatInPlats,
  incrementPlat,
} from '../../services/plat';
import { AlimentType, PlatType, UserType } from '../../type';
import { Submit } from '../Buttons';
import { ErrorMessage, H3, P1 } from '../Text';

interface ShoppingCardProps {
  children?: ReactNode;
  className?: string;
  isOpen: boolean;
  shoppingEle?: PlatType;
  setShoppingEle: (v: undefined) => void;
  setNotif: (v: number) => void;
  setFilter: (v: string) => void;
  user?: UserType;
  setIsLoginModalOpen: (v: boolean) => void;
}

export function ShoppingCard(props: ShoppingCardProps): JSX.Element {
  const {
    children,
    setFilter,
    className,
    isOpen,
    shoppingEle,
    setNotif,
    setShoppingEle,
    setIsLoginModalOpen,

    user,
  } = props;
  const [shoppingList, setShoppingList] = useState<
    {
      plat: PlatType;
      quantite: number;
      message?: string;
    }[]
  >([]);

  useEffect(() => {
    if (shoppingEle) {
      const index = findPlatInPlats(
        shoppingList.map((p) => p.plat),
        shoppingEle
      );
      if (index !== -1) {
        setShoppingList(incrementPlat(index, shoppingList));
      } else {
        setShoppingList([...shoppingList, { plat: shoppingEle, quantite: 1 }]);
      }
    }
    setNotif(shoppingList.length);

    setShoppingEle(undefined);
  }, [shoppingEle, setShoppingEle, shoppingList, setNotif]);

  useEffect(() => {
    if (shoppingList.length !== 0)
      sessionStorage.setItem('shoppingCard', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    const shop = sessionStorage.getItem('shoppingCard');
    if (shop) {
      setShoppingList(JSON.parse(shop));
    }
  }, []);

  async function updateAli(aliment: AlimentType, quantite: number) {
    await updateAliment({
      ...aliment,
      quantiteInStock: aliment.quantiteInStock - quantite,
    });
  }

  async function onSubmit() {
    if (user) {
      shoppingList.forEach(async (plat) => {
        await updatePlat({
          ...plat.plat,
          aliments: await Promise.all(
            plat.plat.aliments.map(async (aliment) => {
              await updateAli(aliment.detail, plat.quantite);
              return {
                quantite: aliment.quantite,
                alimentId: aliment.detail._id,
              };
            })
          ),
        });
      });
      setShoppingList([]);
      setNotif(0);
      setFilter('fetchPlats');
    } else {
      setIsLoginModalOpen(true);
    }
  }

  return (
    <Main $isOpen={isOpen} className={className}>
      {shoppingList.length === 0 ? (
        <Item>
          <P1>Le panier est vide</P1>
        </Item>
      ) : (
        <>
          {shoppingList.map((p, i) => (
            <Item key={i}>
              <Image src={p.plat.image} alt='img' />
              <Info>
                <Title>{p.plat.nom}</Title>
                <Price>{p.plat.prix}€</Price>
              </Info>
              {p.message && (
                <ErrorMessageStyled>{p.message}</ErrorMessageStyled>
              )}
              <Number>
                <P1>{p.quantite}</P1>
                <Info>
                  <Button
                    onClick={() => {
                      const list = incrementPlat(i, shoppingList);
                      setShoppingList([...list]);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      const list = decrementPlat(i, shoppingList);
                      setNotif(shoppingList.length);
                      setShoppingList([...list]);
                    }}
                  >
                    -
                  </Button>
                </Info>
              </Number>
            </Item>
          ))}
          <H3>
            Total :{' '}
            {shoppingList
              .map((p) => p.quantite * p.plat.prix)
              .reduce((a, b) => a + b)}
            €
          </H3>
          <Command onClick={onSubmit}>Commander</Command>
        </>
      )}
    </Main>
  );
}

const Main = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 100%;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  border: solid 1px grey;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 350px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const Item = styled.div`
  padding: 15px 0px 15px 0px;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.p`
  font-size: 15px;
  margin: 0;
`;

const Price = styled.p`
  font-size: 20px;
  margin: 0;
`;

const Number = styled.div`
  position: relative;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 1px;
  background-color: white;
  border: solid 1px black;
  color: black;
  transition: all 0.2s;
  margin-left: 8px;

  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const Command = styled(Submit)`
  margin-top: 15px;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  font-size: 12px;
  margin-right: 10px;
  width: 100%;
`;
