import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Account, Aliment, LoginModal, Plat, Stock, Users } from '.';
import { getPlatByType, getPlats, getUser } from '../api';
import {
  Navbar,
  ProductCards,
  ProductDetail,
  RegisterModal,
} from '../components';
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<PlatType>();
  const [shoppingPlat, setShoppingPlat] = useState<PlatType>();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
    fetchUser();
  }, [filter, setFilter]);

  useEffect(() => {
    fetchUser();
  }, []);

  function renderPage(filter: string) {
    switch (filter) {
      case 'account':
        return <Account setFilter={setFilter} user={user} />;
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
        setIsLoginModalOpen={setIsLoginModalOpen}
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
        setIsModalOpen={setIsLoginModalOpen}
        isModalOpen={isLoginModalOpen}
        setUser={setUser}
        setRegister={setIsRegisterModalOpen}
      />
      <RegisterModal
        setIsModalOpen={setIsRegisterModalOpen}
        isModalOpen={isRegisterModalOpen}
        setLogin={setIsLoginModalOpen}
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
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;
