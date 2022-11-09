import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { createUser } from '../../api';
import { Submit } from '../Buttons';
import { Input } from '../Inputs';
import { Select } from '../Selects';
import { ErrorMessage, H1 } from '../Text';
import { Modal } from './Modal';

interface RegisterModalProps {
  children?: ReactNode;
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  setLogin: (v: boolean) => void;
}

export function RegisterModal(props: RegisterModalProps): JSX.Element {
  const { children, className, setLogin, isModalOpen, setIsModalOpen } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('basic');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passCheck, setPassCheck] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  async function onRegister() {
    setErrorMessage('');
    if (
      username !== '' &&
      role !== '' &&
      password !== '' &&
      email !== '' &&
      country !== '' &&
      address !== '' &&
      phone !== ''
    ) {
      if (passCheck) {
        const res = await createUser({
          id: '',
          username: username,
          role: role,
          password: password,
          address: address,
          phone: phone,
          email: email,
          country: country,
        });
        if (res.ok) {
          setLogin(true);
          setIsModalOpen(false);
        } else {
          setErrorMessage(res.statusText);
        }
      } else {
        setErrorMessage('Les deux mots de passe ne sont pas identique');
      }
    } else {
      setErrorMessage('Veuillez remplir tous les champs...');
    }
  }

  function verifyPassword(e: React.FormEvent<HTMLInputElement>) {
    setConfirmPassword(e.currentTarget.value);
    if (e.currentTarget.value !== password) {
      setErrorMessage('Les deux mots de passe ne sont pas identique');
      setPassCheck(false);
    } else {
      setErrorMessage('');
      setPassCheck(true);
    }
  }

  return (
    <Main className={className}>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <ArrowContainer>
          <ArrowLeftIconStyled
            onClick={() => {
              setIsModalOpen(false);
              setLogin(true);
            }}
          />
        </ArrowContainer>
        <ModalContainer>
          <H1Styled>Créer un compte</H1Styled>
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
              <InputStyled
                type='text'
                value={country}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setCountry(e.currentTarget.value)
                }
                label='Pays'
              />
            </Left>
            <Right>
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
              <InputStyled
                type='password'
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
                label='Mot de passe'
              />
              <InputStyled
                type='password'
                value={confirmPassword}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  verifyPassword(e)
                }
                label='Confirmer le MPD'
              />
            </Right>
          </Inputs>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SubmitStyled onClick={onRegister}>Créer un compte</SubmitStyled>
        </ModalContainer>
      </Modal>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
`;

const H1Styled = styled(H1)`
  margin-bottom: 20px;
`;

const InputStyled = styled(Input)`
  margin: 5px 0 5px 0;
  width: 90%;
`;

const SubmitStyled = styled(Submit)`
  margin-top: 10px;
  width: 50%;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const ArrowContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  margin-bottom: 10px;
`;

const ArrowLeftIconStyled = styled(ArrowLeftIcon)`
  width: 40px;
  transition: all 0.3s;
  :hover {
    cursor: pointer;
    transform: translateX(-8px);
  }
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
