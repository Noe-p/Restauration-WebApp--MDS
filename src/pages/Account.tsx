import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { removeUser, updateUser } from '../api';
import { ErrorMessage, Input, Select, Submit } from '../components';
import { UserType } from '../type';

interface AccountProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  user?: UserType;
  setIsModalOpen?: (v: boolean) => void;
}

export function Account(props: AccountProps): JSX.Element {
  const { children, className, user, setFilter, setIsModalOpen } = props;
  const [username, setUsername] = useState(user ? user.username : '');
  const [role, setRole] = useState(user ? user.role : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [address, setAddress] = useState(user ? user.address : '');
  const [country, setCountry] = useState(user ? user.country : '');

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  async function onRegister() {
    setErrorMessage('');
    if (
      username !== '' &&
      role !== '' &&
      email !== '' &&
      country !== '' &&
      address !== '' &&
      phone !== ''
    ) {
      const res = await updateUser({
        id: user ? user?.id : '',
        username: username,
        role: role,
        address: address,
        phone: phone,
        email: email,
        country: country,
      });
      if (res.ok) {
        if (setIsModalOpen) {
          setIsModalOpen(false);
        } else {
          setFilter('fetchUser');
        }
      } else {
        setErrorMessage(res.statusText);
      }
    } else {
      setErrorMessage('Veuillez remplir tous les champs...');
    }
  }

  async function onRemoveUser() {
    if (user?.id) await removeUser(user.id);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    } else {
      setFilter('fetchUser');
    }
  }

  return (
    <Main className={className}>
      <Inputs>
        <Left>
          <InputStyled
            type='text'
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
            label='Identifiant'
          />
          <InputStyled
            type='mail'
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            label='Email'
          />
          <InputStyled
            type='text'
            value={address}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setAddress(e.currentTarget.value)
            }
            label='Adresse'
          />
        </Left>
        <Right>
          <InputStyled
            type='text'
            value={country}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setCountry(e.currentTarget.value)
            }
            label='Pays'
          />
          <InputStyled
            type='text'
            value={phone}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPhone(e.currentTarget.value)
            }
            label='Téléphone'
          />
          <Select
            label='Role'
            value={role}
            setValue={setRole}
            list={['admin', 'basic']}
          />
        </Right>
      </Inputs>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <SubmitContainer>
        <SubmitStyled onClick={onRegister}>Modifier</SubmitStyled>
        <RemoveStyled onClick={() => onRemoveUser()}>Suprimer</RemoveStyled>
      </SubmitContainer>
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

const InputStyled = styled(Input)`
  margin: 5px 0 5px 0;
  width: 90%;
`;

const Inputs = styled.div`
  display: flex;
  justify-content: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitStyled = styled(Submit)`
  margin-top: 10px;
  width: 40%;
`;

const SubmitContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const RemoveStyled = styled(SubmitStyled)`
  :hover {
    background-color: brown;
  }
`;
