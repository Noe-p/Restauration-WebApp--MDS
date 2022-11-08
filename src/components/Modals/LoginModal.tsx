import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ErrorMessage, H1, Input, Modal, Submit } from '..';
import { getUser, userLogin } from '../../api';
import { UserType } from '../../type';

interface LoginModalProps {
  children?: ReactNode;
  className?: string;
  setUser: (user: UserType | undefined) => void;
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
}

export function LoginModal(props: LoginModalProps): JSX.Element {
  const { children, className, setUser, isModalOpen, setIsModalOpen } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  async function login() {
    const user = await userLogin(username, password);
    setErrorMessage(user?.message);
    if (user?.user) {
      setUser(await getUser(user.user.id));
      setIsModalOpen(false);
      setErrorMessage('');
    }
  }

  return (
    <Main className={className}>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <LoginContainer>
          <H1Styled>Veuiller indiquer vos identifiants</H1Styled>
          <InputStyled
            type='text'
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
            label='Identifiant'
          />
          <InputStyled
            type='password'
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            label='Mot de passe'
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SubmitStyled onClick={login}>Se connecter</SubmitStyled>
        </LoginContainer>
      </Modal>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 40;
`;

const H1Styled = styled(H1)`
  margin-bottom: 20px;
`;

const InputStyled = styled(Input)`
  margin: 5px 0 5px 0;
  width: 80%;
`;

const SubmitStyled = styled(Submit)`
  margin-top: 10px;
  width: 50%;
`;

const LoginContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
