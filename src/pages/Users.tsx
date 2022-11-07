import { ReactNode } from 'react';
import styled from 'styled-components';
import { UserType } from '../type';

interface UsersProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
}

export function Users(props: UsersProps): JSX.Element {
  const { children, className } = props;

  return <Main className={className}>{children}</Main>;
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
