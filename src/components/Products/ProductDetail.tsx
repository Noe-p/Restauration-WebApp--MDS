import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { PlatType } from '../../type';
import { Submit } from '../Buttons';
import { ErrorMessage, H1, H3, P1, P2 } from '../Text';

interface ProductDetailProps {
  children?: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  productDetail?: PlatType;
  setShoppingPlat: (v: PlatType) => void;
}

export function ProductDetail(props: ProductDetailProps): JSX.Element {
  const {
    children,
    className,
    isOpen,
    setIsOpen,
    productDetail,
    setShoppingPlat,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');

  function addOnShoppingCard() {
    setErrorMessage('');
    if (productDetail) {
      const index = productDetail?.aliments.findIndex(
        (item) => Number(item.detail.quantiteInStock) < item.quantite
      );

      if (index !== -1) {
        setErrorMessage("Ce plat n'est plus disponible.");
      } else {
        setShoppingPlat(productDetail);
      }
    }
  }

  return (
    <Main className={className}>
      <Detail $isOpen={isOpen}>
        <H1>{productDetail?.nom}</H1>
        <Image src={productDetail?.image} alt='image' />
        <AlimentContainer>
          {productDetail?.aliments.map((a, i) => (
            <Element $empty={a.detail?.quantiteInStock <= 0} key={i}>
              {a.detail?.nom}
            </Element>
          ))}
        </AlimentContainer>
        <P1Styled>{productDetail?.description}</P1Styled>
        <H3Styled>Prix : {productDetail?.prix}€</H3Styled>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <SubmitStyled onClick={addOnShoppingCard}>
          Ajouter au panier
        </SubmitStyled>
      </Detail>
      <ClickOutside $isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 20;
  overflow-y: scroll;
`;

const Detail = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  width: ${({ $isOpen }) => ($isOpen ? '50vw' : '0vw')};
  background-color: white;
  height: 100vh;
  left: 0;
  top: 0;
  border-right: solid 1px black;
  transition: all 0.2s;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
`;

const ClickOutside = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? '50vw' : '0vw')};
  right: 0;
  opacity: 0;
`;

const Image = styled.img`
  width: 60%;
  height: 30%;
  border-radius: 10px;
  object-fit: cover;
`;

const AlimentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 60%;
`;

const Element = styled(P1)<{ $empty: boolean }>`
  padding: 10px 20px 10px 20px;
  border: solid 1px ${({ $empty }) => ($empty ? 'grey' : 'black')};
  background-color: white;
  color: ${({ $empty }) => ($empty ? 'grey' : 'black')};
  margin-right: 5px;
  margin-bottom: 5px;
  opacity: ${({ $empty }) => ($empty ? '0.5' : '1')};
`;

const P1Styled = styled(P1)`
  width: 60%;
  margin-top: 20px;
`;

const H3Styled = styled(H3)`
  width: 60%;
  margin-top: 20px;
`;

const SubmitStyled = styled(Submit)`
  margin-top: 30px;
`;

const WarningContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;
const WarningIconOrange = styled(ExclamationTriangleIcon)`
  width: 20px;
  margin-right: 10px;
  color: #fda100;
`;

const WarningIconRed = styled(ExclamationTriangleIcon)`
  width: 20px;
  margin-right: 10px;
  color: brown;
`;
const WarningMessage = styled(P2)`
  color: green;
`;

const WarningMessageOrange = styled(WarningMessage)`
  color: #fda100;
`;
const WarningMessageRed = styled(WarningMessage)`
  color: brown;
`;
