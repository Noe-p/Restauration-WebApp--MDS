import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUsers } from '../api';
import { H1, H3, Modal } from '../components';
import { UserType } from '../type';
import { Account } from './Account';

interface UsersProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
}

export function Users(props: UsersProps): JSX.Element {
  const { children, className, setFilter } = props;
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UserType>({
    id: '',
    role: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    country: '',
  });

  async function fetchUsers() {
    setUsers(await getUsers());
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  function onUserClick(user: UserType) {
    setUpdatedUser(user);
    setIsModalOpen(true);
  }

  return (
    <Main className={className}>
      <H1>Gérer les utilisateurs</H1>
      <Container>
        <table>
          <thead>
            <tr>
              <th>
                <H3>ID</H3>
              </th>
              <th>
                <H3>Identifiant</H3>
              </th>
              <th>
                <H3>Email</H3>
              </th>
              <th>
                <H3>Téléphone</H3>
              </th>
              <th>
                <H3>Adresse</H3>
              </th>
              <th>
                <H3>Pays</H3>
              </th>
              <th>
                <H3>Rôle</H3>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} onClick={() => onUserClick(user)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.country}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <UserDetail
          user={updatedUser}
          setFilter={setFilter}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 110px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  table,
  td,
  tr,
  th {
    border: 1px solid #333;
    border-collapse: collapse;
    padding: 15px 20px 15px 20px;
    text-align: center;
  }

  tr {
    :hover {
      cursor: pointer;
    }
  }
`;

const UserDetail = styled(Account)`
  width: 100%;
  margin-top: 0;
`;
