import { ReactNode } from 'react';
import styled from 'styled-components';

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

export function Submit(props: SubmitProps): JSX.Element {
  const { children } = props;

  return <Main {...props}>{children}</Main>;
}

const Main = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: white;
  padding: 10px 20px 10px 20px;
  border: solid 1px black;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background-color: black;
    color: white;
  }
`;
