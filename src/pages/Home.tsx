import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Account, Aliment, LoginModal, Plat, Stock, Users } from '.';
import { getPlatByType, getPlats, getUser } from '../api';
import { Navbar, ProductCards, ProductDetail } from '../components';
import { getCookie } from '../services/cookies';
import { PlatType, PlatTypeEnum, UserType } from '../type';

interface HomeProps {
  children?: ReactNode;
  className?: string;
}

export function Home(props: HomeProps) {
  const [plats, setPlats] = useState<PlatType[]>();
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<PlatType>();
  const [shoppingPlat, setShoppingPlat] = useState<PlatType>();

  async function fetchPlats(filter: string) {
    switch (filter) {
      case '':
        setPlats(await getPlats());
        break;
      case PlatTypeEnum.PRINCIPAL:
        setPlats(await getPlatByType(PlatTypeEnum.PRINCIPAL));
        break;
      case PlatTypeEnum.ENTREE:
        setPlats(await getPlatByType(PlatTypeEnum.ENTREE));
        break;
      case PlatTypeEnum.DESSERT:
        setPlats(await getPlatByType(PlatTypeEnum.DESSERT));
        break;
      default:
        setPlats(await getPlats());
        break;
    }
  }

  async function openDetailProduct(plat: PlatType) {
    setIsDetailOpen(true);
    setProductDetail(plat);
  }

  async function fetchUser() {
    const user = await getUser(getCookie('userId'));
    setUser(user.id ? user : undefined);
  }

  useEffect(() => {
    fetchPlats(filter);
    setIsDetailOpen(false);
  }, [filter, setFilter]);

  useEffect(() => {
    fetchUser();
  }, []);

  function renderPage(filter: string) {
    switch (filter) {
      case 'account':
        return <Account setFilter={setFilter} setUser={setUser} />;
      case 'plat':
        return <Plat setFilter={setFilter} setUser={setUser} />;
      case 'aliment':
        return <Aliment setFilter={setFilter} setUser={setUser} />;
      case 'stock':
        return <Stock setFilter={setFilter} setUser={setUser} />;
      case 'users':
        return <Users setFilter={setFilter} setUser={setUser} />;
      default:
        return (
          <>
            <Banner src='/banner.jpeg' alt='imageBanner' />
            <ProductList>
              {plats?.map((plat) => (
                <ProductCards
                  key={plat._id}
                  onClick={() => openDetailProduct(plat)}
                  plat={plat}
                />
              ))}
            </ProductList>
          </>
        );
    }
  }

  return (
    <Main>
      <Navbar
        setIsModalOpen={setIsModalOpen}
        user={user}
        setUser={setUser}
        filter={filter}
        setFilter={setFilter}
        shoppingEle={shoppingPlat}
        setShoppingEle={setShoppingPlat}
      />
      <Content>{renderPage(filter)}</Content>
      <ProductDetail
        productDetail={productDetail}
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        setShoppingPlat={setShoppingPlat}
      />
      <LoginModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setUser={setUser}
      />
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
`;

const Banner = styled.img`
  width: 100vw;
  height: 400px;
  object-fit: cover;
`;

const ProductList = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;
