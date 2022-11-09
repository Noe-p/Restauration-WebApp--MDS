import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { PlatType } from '../../type';
import { Submit } from '../Buttons';
import { ErrorMessage, H1, H3, P1 } from '../Text';

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
        <Scroll>
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
        </Scroll>
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
  height: 100vh;
`;

const Detail = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  width: ${({ $isOpen }) => ($isOpen ? '50vw' : '0vw')};
  height: 100%;
  background-color: white;
  left: 0;
  top: 0;
  transition: all 0.2s;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

const Scroll = styled.div`
  z-index: 20;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  height: 75%;
  box-shadow: rgba(0, 0, 0, 0.09) 0px -50px 36px -20px inset;
`;

const ClickOutside = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? '50vw' : '0vw')};
  right: 0;
  top: 0;
`;

const Image = styled.img`
  width: 60%;
  height: 50%;
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
