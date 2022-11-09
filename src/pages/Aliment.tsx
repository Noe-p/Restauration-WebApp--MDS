import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { addAliment } from '../api';
import {
  ErrorMessage,
  H1,
  Input,
  Select,
  Submit,
  ValideMessage,
} from '../components';
import { AlimentType, AlimentTypeEnum, UserType } from '../type';

interface AlimentProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
  value?: AlimentType;
  update?: boolean;
  setValue?: (plat: AlimentType) => void;
}

export function Aliment(props: AlimentProps): JSX.Element {
  const { children, update, className, value, setValue, setFilter } = props;
  const [nom, setNom] = useState(value ? value.nom : '');
  const [type, setType] = useState(value ? value.type : '');
  const [quantite, setQuantite] = useState<number>(
    value ? value.quantiteInStock : 0
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [valideMessage, setValideMessage] = useState('');

  async function createAliment() {
    if (nom === '' || quantite === 0 || type === '') {
      setErrorMessage('Veuillez remplir tous les champs.');
    } else {
      addAliment({
        nom: nom,
        type: type,
        quantiteInStock: quantite,
      });
      setNom('');
      setQuantite(0);
      setType('');
      setErrorMessage('');
      setValideMessage('Aliment ajouté');
    }
  }

  useEffect(() => {
    if (value && setValue)
      setValue({
        ...value,
        nom: nom,
        type: type,
        quantiteInStock: quantite,
      });
  }, [nom, type, quantite]);

  return (
    <Main className={className}>
      {!update && <H1>Créer un Aliment</H1>}
      <InputStyled
        label='Nom'
        value={nom}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setNom(e.currentTarget.value)
        }
      />

      <SelectStyled
        value={type}
        setValue={setType}
        list={Object.values(AlimentTypeEnum)}
      />
      <InputStyled
        required
        min={0}
        label='Quantité'
        type='number'
        value={quantite}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setQuantite(Number(e.currentTarget.value))
        }
      />
      <ValideMessage>{valideMessage}</ValideMessage>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <SubmitContainer>
        {update ? (
          children
        ) : (
          <SubmitStyled onClick={createAliment}>Ajouter l'aliment</SubmitStyled>
        )}
      </SubmitContainer>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin-top: 110px;
`;

const InputStyled = styled(Input)`
  width: 70%;
  margin-top: 10px;
`;

const SelectStyled = styled(Select)`
  width: 70%;
  margin-top: 10px;
`;

const SubmitContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 40%;
  justify-content: space-around;
`;

const SubmitStyled = styled(Submit)``;
