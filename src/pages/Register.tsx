import { ReactNode } from 'react';
import styled from 'styled-components';

interface RegisterProps {
  children?: ReactNode;
  className?: string;
}

export function Register(props: RegisterProps): JSX.Element {
  const { children, className } = props;

  return <Main className={className}>Register Page</Main>;
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
