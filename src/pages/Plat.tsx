import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { addPlat, getAliments } from '../api';
import {
  ErrorMessage,
  H1,
  Input,
  Select,
  SelectMultiple,
  Submit,
} from '../components';
import { AlimentType, PlatType, PlatTypeEnum, UserType } from '../type';

interface PlatProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
  value?: PlatType;
  update?: boolean;
  setValue?: (plat: PlatType) => void;
}

export function Plat(props: PlatProps): JSX.Element {
  const { children, value, setValue, update, className, setFilter } = props;
  const [nom, setNom] = useState(value ? value.nom : '');
  const [prix, setPrix] = useState<number>(value ? value.prix : 0);

  const [description, setDescription] = useState(
    value ? value.description : ''
  );
  const [image, setImage] = useState(value ? value.image : '');
  const [aliments, setAliments] = useState<
    {
      detail: AlimentType;
      quantite: number;
      disabled?: boolean;
    }[]
  >(value ? value.aliments : []);
  const [type, setType] = useState(value ? value.type : '');
  const [allAliments, setAllAliments] = useState<AlimentType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchAliments() {
    setAllAliments(await getAliments());
  }

  async function createPlat() {
    if (
      nom === '' ||
      prix === 0 ||
      description === '' ||
      image === '' ||
      aliments.length === 0 ||
      type === ''
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
    } else if (
      aliments.find((item) => item.disabled || undefined) &&
      allAliments.find((item) => item.quantiteInStock <= 0)
    ) {
      setErrorMessage("Vous n'avez pas assez de produits disponibles");
    } else {
      addPlat({
        _id: '',
        nom: nom,
        type: type,
        date: new Date(),
        prix: prix,
        description: description,
        image: image,
        aliments: aliments.map((a) => {
          return { quantite: a.quantite, alimentId: a.detail._id };
        }),
      });
      setFilter('');
      setErrorMessage('');
    }
  }

  useEffect(() => {
    fetchAliments();
  }, []);

  useEffect(() => {
    if (setValue && value) {
      setValue({
        _id: value._id,
        date: value.date,
        nom: nom,
        type: type,
        prix: prix,
        description: description,
        image: image,
        aliments: aliments,
      });
    }
  }, [nom, type, prix, description, image, aliments, setValue]);

  return (
    <Main className={className}>
      {!update && <H1Styled>Créer un plat</H1Styled>}
      <Container>
        <Left>
          <InputStyled
            required
            label='Titre'
            value={nom}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNom(e.currentTarget.value)
            }
          />
          <InputStyled
            required
            label='Description'
            value={description}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
          />
          <InputStyled
            required
            min={0}
            label='Prix'
            type='number'
            value={prix}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPrix(Number(e.currentTarget.value))
            }
          />
          <InputStyled
            required
            label='Image'
            value={image}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setImage(e.currentTarget.value)
            }
          />
        </Left>
        <Right>
          <SelectStyled
            label='Choisir un type'
            value={type}
            setValue={setType}
            list={Object.values(PlatTypeEnum)}
          />
          <SelectMulStyled
            label='Ajouter les ingrédients'
            value={aliments}
            setValue={setAliments}
            list={allAliments}
          />
        </Right>
      </Container>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <SubmitContainer>
        {update ? (
          children
        ) : (
          <SubmitStyled onClick={createPlat}>Ajouter le plat</SubmitStyled>
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
  width: 100%;
  margin-top: 110px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Left = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const H1Styled = styled(H1)``;

const InputStyled = styled(Input)`
  margin: 5px 0 5px 0;
  width: 80%;
`;

const SelectStyled = styled(Select)`
  margin: 5px 0 5px 0;
`;

const SelectMulStyled = styled(SelectMultiple)`
  margin: 10px 0 10px 0;
`;

const SubmitContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 40%;
  justify-content: space-around;
`;

const SubmitStyled = styled(Submit)``;
