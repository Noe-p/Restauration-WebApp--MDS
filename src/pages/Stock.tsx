import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getAliments,
  getPlats,
  removeAliment,
  removePlat,
  updateAliment,
  updatePlat,
} from '../api';
import { H1, H3, Modal, Submit } from '../components';
import { AlimentType, PlatType, UserType } from '../type';
import { Aliment } from './Aliment';
import { Plat } from './Plat';

interface StockProps {
  children?: ReactNode;
  className?: string;
  setFilter: (filter: string) => void;
  setUser: (user: UserType | undefined) => void;
}

export function Stock(props: StockProps): JSX.Element {
  const { children, className, setFilter, setUser } = props;
  const [aliments, setAliments] = useState<AlimentType[]>([]);
  const [plats, setPlats] = useState<PlatType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateAli, setUpdateAliment] = useState<AlimentType>({
    nom: '',
    type: '',
    quantiteInStock: 0,
    _id: '',
    date: new Date(),
  });
  const [updatePlatEle, setUpdatePlatEle] = useState<PlatType>({
    nom: '',
    type: '',
    _id: '',
    date: new Date(),
    prix: 0,
    description: '',
    aliments: [],
    image: '',
  });
  const [isModalPlatOpen, setIsModalPlatOpen] = useState(false);

  async function fetchAliments() {
    setAliments(await getAliments());
  }
  async function fetchPlats() {
    setPlats(await getPlats());
  }

  function onAlimentClick(aliment: AlimentType) {
    setUpdateAliment(aliment);
    setIsModalOpen(true);
  }

  async function onPlatClick(plat: PlatType) {
    setUpdatePlatEle(plat);
    setIsModalPlatOpen(true);
  }

  async function onUpdateAliment() {
    await updateAliment(updateAli);
    fetchAliments();
    setIsModalOpen(false);
  }

  async function onRemoveAliment(id: string) {
    await removeAliment(id);
    fetchAliments();
    setIsModalOpen(false);
  }

  async function onUpdatePlat() {
    await updatePlat({
      ...updatePlatEle,
      aliments: updatePlatEle.aliments.map((aliment) => {
        return { quantite: aliment.quantite, alimentId: aliment.detail._id };
      }),
    });
    fetchPlats();
    setIsModalPlatOpen(false);
    setFilter('stock');
  }

  async function onRemovePlat(id?: string) {
    await removePlat(id);
    fetchPlats();
    setIsModalPlatOpen(false);
  }

  useEffect(() => {
    fetchAliments();
    fetchPlats();
  }, []);

  return (
    <Main className={className}>
      <H1>Gérer les aliments</H1>
      <Container>
        <table>
          <thead>
            <tr>
              <th>
                <H3>Nom</H3>
              </th>
              <th>
                <H3>ID</H3>
              </th>
              <th>
                <H3>Type</H3>
              </th>
              <th>
                <H3>Quantité</H3>
              </th>
            </tr>
          </thead>
          <tbody>
            {aliments.map((aliment, i) => (
              <tr key={i} onClick={() => onAlimentClick(aliment)}>
                <td>{aliment._id}</td>
                <td>{aliment.nom}</td>
                <td>{aliment.type}</td>
                <td>{aliment.quantiteInStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <H1>Gérer les plats</H1>
      <Container>
        <table>
          <thead>
            <tr>
              <th>
                <H3>Nom</H3>
              </th>
              <th>
                <H3>ID</H3>
              </th>
              <th>
                <H3>Type</H3>
              </th>
              <th>
                <H3>Image</H3>
              </th>
              <th>
                <H3>Description</H3>
              </th>
            </tr>
          </thead>
          <tbody>
            {plats.map((plat, i) => (
              <tr onClick={() => onPlatClick(plat)} key={i}>
                <td>{plat.nom}</td>
                <td>{plat._id}</td>
                <td>{plat.type}</td>
                <td>{plat.image.substring(0, 10)}...</td>
                <td>{plat.description.substring(0, 30)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <AlimentStyled
          update
          value={updateAli}
          setFilter={setFilter}
          setUser={setUser}
          setValue={setUpdateAliment}
        >
          <SubmitContainer>
            <SubmitStyled onClick={onUpdateAliment}>Modifier</SubmitStyled>
            <RemoveStyled onClick={() => onRemoveAliment(updateAli._id)}>
              Suprimer
            </RemoveStyled>
          </SubmitContainer>
        </AlimentStyled>
      </Modal>
      <Modal
        isOpen={isModalPlatOpen}
        onRequestClose={() => setIsModalPlatOpen(false)}
      >
        <Plat
          update
          value={updatePlatEle}
          setFilter={setFilter}
          setUser={setUser}
          setValue={setUpdatePlatEle}
        >
          <SubmitContainer>
            <SubmitStyled onClick={onUpdatePlat}>Modifier</SubmitStyled>
            <RemoveStyled onClick={() => onRemovePlat(updatePlatEle._id)}>
              Suprimer
            </RemoveStyled>
          </SubmitContainer>
        </Plat>
      </Modal>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
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

const AlimentStyled = styled(Aliment)`
  width: 100%;
`;

const SubmitContainer = styled.div`
  margin-top: 30px;
  display: flex;
`;

const SubmitStyled = styled(Submit)`
  margin: 10px;
`;

const RemoveStyled = styled(SubmitStyled)`
  :hover {
    background-color: brown;
  }
`;
