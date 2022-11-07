import styled from 'styled-components';
import { PlatType } from '../../type/PlatType';
import { H1, P1, P2 } from '../Text';

interface ProductCardsProps {
  className?: string;
  plat: PlatType;
}

export function ProductCards(props: ProductCardsProps): JSX.Element {
  const { plat } = props;

  return (
    <Main {...props}>
      <LeftSide>
        <Image src={plat.image} alt='image' />
      </LeftSide>
      <RightSide>
        <H1>{plat.nom}</H1>
        <P2>{plat.description}</P2>
        <P1>{plat.prix}€</P1>
      </RightSide>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  border: solid 1px black;
  padding: 10px;
`;

const LeftSide = styled.div``;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;
