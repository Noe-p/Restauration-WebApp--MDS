import { ReactNode } from 'react';
import styled from 'styled-components';
import { UserType } from '../type';

interface AccountProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
}

export function Account(props: AccountProps): JSX.Element {
  const { children, className, setUser, setFilter } = props;

  return <Main className={className}>Account Page</Main>;
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
