import { MinusCircleIcon } from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { AlimentType } from '../../type';
import { ErrorMessage, H3, P2 } from '../Text';
interface SelectMultipleProps {
  children?: ReactNode;
  className?: string;
  value: {
    detail: AlimentType;
    quantite: number;
    disabled?: boolean;
  }[];
  setValue: (
    v: {
      detail: AlimentType;
      quantite: number;
      disabled?: boolean;
    }[]
  ) => void;
  list: AlimentType[];
  label?: string;
}

export function SelectMultiple(props: SelectMultipleProps): JSX.Element {
  const { children, label, className, value, setValue, list } = props;
  const [errorMessage, setErrorMessage] = useState('');

  function addAliment(e: any, element: AlimentType) {
    setErrorMessage('');
    e.stopPropagation();
    const alimentIndex = indexOfAliment(element, value);
    const aliment = value[alimentIndex];

    if (alimentIndex !== -1) {
      if (aliment.quantite < aliment.detail.quantiteInStock) {
        value.splice(alimentIndex, 1, {
          ...aliment,
          quantite: aliment.quantite + 1,
          disabled: false,
        });

        setValue([...value]);
      } else {
        value.splice(alimentIndex, 1, {
          ...aliment,
          quantite: aliment.quantite + 1,
          disabled: true,
        });
        setErrorMessage(
          `Vous n'avez pas assez de ${aliment.detail.nom} en stock.`
        );
        setValue([...value]);
      }
    } else {
      setValue([...value, { detail: element, quantite: 1 }]);
    }
  }

  function removeAliment(e: any, element: AlimentType) {
    setErrorMessage('');
    e.stopPropagation();
    const alimentIndex = indexOfAliment(element, value);
    const aliment = value[alimentIndex];

    if (alimentIndex !== -1) {
      if (aliment.quantite > 1) {
        if (aliment.quantite - 1 <= aliment.detail.quantiteInStock) {
          value.splice(alimentIndex, 1, {
            ...aliment,
            quantite: aliment.quantite - 1,
            disabled: false,
          });
        } else {
          value.splice(alimentIndex, 1, {
            ...aliment,
            quantite: aliment.quantite - 1,
            disabled: true,
          });
          setErrorMessage(
            `Vous n'avez pas assez de ${aliment.detail.nom} en stock.`
          );
        }
      } else {
        value.splice(alimentIndex, 1);
      }
    }
    setValue([...value]);
  }

  function indexOfAliment(
    aliment: AlimentType,
    aliments: {
      detail: AlimentType;
      quantite: number;
    }[]
  ): number {
    return aliments.findIndex((item) => item.detail._id === aliment?._id);
  }

  return (
    <Main className={className}>
      {label && <H3>{label}</H3>}
      <ElementList>
        {list.map((v) => (
          <Element
            $disabled={value[indexOfAliment(v, value)]?.disabled}
            $empty={v.quantiteInStock <= 0}
            key={v._id}
            $selected={indexOfAliment(v, value) !== -1}
            onClick={(e) => v.quantiteInStock > 0 && addAliment(e, v)}
          >
            {indexOfAliment(v, value) !== -1 && (
              <MinusCircleIconStyled onClick={(e) => removeAliment(e, v)} />
            )}

            <Label>{v.nom}</Label>
            {indexOfAliment(v, value) !== -1 && (
              <P2>{`${value[indexOfAliment(v, value)].quantite}/${
                v.quantiteInStock
              }`}</P2>
            )}
          </Element>
        ))}
      </ElementList>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ElementList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Element = styled.div<{
  $selected: boolean;
  $disabled: boolean | undefined;
  $empty: boolean;
}>`
  padding: 10px 20px 10px 20px;
  border: solid 1px ${({ $disabled }) => ($disabled ? 'grey' : 'black')};
  border: solid 1px ${({ $empty }) => $empty && 'grey'};
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  color: ${({ $disabled }) => $disabled && 'grey'};
  color: ${({ $empty }) => $empty && 'grey'};

  background-color: ${({ $selected }) => ($selected ? 'black' : 'white')};
  background-color: ${({ $disabled }) => $disabled && 'white'};
  background-color: ${({ $empty }) => $empty && 'white'};

  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;

  :hover {
    background-color: ${({ $empty }) => ($empty ? 'white' : 'black')};
    color: ${({ $empty }) => ($empty ? 'grey' : 'white')};
    cursor: ${({ $empty }) => !$empty && 'pointer'};
  }
`;

const MinusCircleIconStyled = styled(MinusCircleIcon)`
  width: 15px;
  margin-right: 15px;
  :hover {
    cursor: pointer;
  }
`;
const Label = styled(P2)`
  margin-right: 10px;
`;
