import { ReactNode } from 'react';
import styled from 'styled-components';

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  black?: boolean;
}

export function Submit(props: SubmitProps): JSX.Element {
  const { children, black } = props;

  return (
    <Main $black={black} {...props}>
      {children}
    </Main>
  );
}

const Main = styled.button<{ $black?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${({ $black }) => ($black ? 'black' : 'white')};
  padding: 10px 20px 10px 20px;
  border: solid 1px black;
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ $black }) => ($black ? 'white' : 'black')};

  :hover {
    background-color: ${({ $black }) => ($black ? 'white' : 'black')};
    color: ${({ $black }) => ($black ? 'black' : 'white')};
  }
`;
