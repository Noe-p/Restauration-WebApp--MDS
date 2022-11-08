import { useState } from 'react';
import styled from 'styled-components';
import { PlatType } from '../../type/PlatType';
import { Submit } from '../Buttons';
import { H1 } from '../Text';

interface ProductCardsProps {
  className?: string;
  plat: PlatType;
  onClick: () => void;
}

export function ProductCards(props: ProductCardsProps): JSX.Element {
  const { plat, onClick } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <Main
      $isHover={isHover}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Image $isHover={isHover} src={plat.image} alt='image' />
      <Infos $isHover={isHover}>
        <H1Styled>{plat.nom}</H1Styled>
        <Price $isHover={isHover}>{plat.prix}€</Price>
        <Submit black onClick={onClick}>
          Voir le produit
        </Submit>
      </Infos>
    </Main>
  );
}

const Main = styled.div<{ $isHover?: boolean }>`
  margin: 10px;
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 7px;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Infos = styled.div<{ $isHover?: boolean }>`
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  background-color: ${({ $isHover }) =>
    $isHover ? 'rgba(250,250,250,0.3)' : 'rgba(0,0,0,0)'};
  transition: all 0.3s;
  border-radius: 4px;
  padding: 7px;
`;
const Image = styled.img<{ $isHover: boolean }>`
  width: ${({ $isHover }) => ($isHover ? '110%' : '100%')};
  height: ${({ $isHover }) => ($isHover ? '110%' : '100%')};
  object-fit: cover;
  position: absolute;
  z-index: 0;

  transition: all 0.3s;
`;

const H1Styled = styled(H1)`
  font-size: 40px;
`;

const Price = styled(H1)<{ $isHover?: boolean }>`
  transition: all 0.3s;
  opacity: ${({ $isHover }) => ($isHover ? '1' : '0')};
  transform: translateY(${({ $isHover }) => ($isHover ? '0' : '100px')});
`;
