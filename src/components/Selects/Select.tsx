import { ReactNode } from 'react';
import styled from 'styled-components';
import { H3, P2 } from '../Text';

interface SelectProps {
  children?: ReactNode;
  className?: string;
  value: string;
  setValue: (v: string) => void;
  list: string[];
  label?: string;
}

export function Select(props: SelectProps): JSX.Element {
  const { children, label, className, value, setValue, list } = props;

  return (
    <Main className={className}>
      {label && <H3>{label}</H3>}
      <ElementList>
        {list.map((v) => (
          <Element
            key={v}
            $selected={value.includes(v)}
            onClick={() => setValue(v)}
          >
            <P2>{v}</P2>
          </Element>
        ))}
      </ElementList>
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

const Element = styled.div<{ $selected: boolean }>`
  padding: 10px 20px 10px 20px;
  border: solid 1px black;
  background-color: ${({ $selected }) => ($selected ? 'black' : 'white')};
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  margin-right: 5px;
  margin-bottom: 5px;

  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;
