/* eslint-disable react-hooks/exhaustive-deps */
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { logoutUser } from '../../api';
import { useOutsideClick } from '../../services/useOutsideClick';
import { PlatType, PlatTypeEnum, UserType } from '../../type';
import { ShoppingCard } from '../Shopping';

interface NavbarProps {
  children?: ReactNode;
  className?: string;
  filter: string;
  setFilter: (filter: string) => void;
  user?: UserType;
  setUser: (user: UserType | undefined) => void;
  setIsLoginModalOpen: (v: boolean) => void;
  shoppingEle?: PlatType;
  setShoppingEle: (v: undefined) => void;
}

export function Navbar(props: NavbarProps): JSX.Element {
  const {
    children,
    className,
    filter,
    setIsLoginModalOpen,
    setFilter,
    setUser,
    user,
    shoppingEle,
    setShoppingEle,
  } = props;
  const [isUserSetOpen, setIsUserSetOpen] = useState(false);
  const [isShoppingCard, setIsShoppingCard] = useState(false);
  const [notif, setNotif] = useState(0);
  const ref = useOutsideClick(() => setIsUserSetOpen(false));
  const ref2 = useOutsideClick(() => setIsShoppingCard(false));

  async function logout() {
    await logoutUser();
    setUser(undefined);
    setFilter('');
  }

  function openUserSetting() {
    setIsUserSetOpen(true);
  }

  return (
    <Main className={className}>
      <div />
      <LeftLinks>
        <LinkStyled $selected={filter === ''} onClick={() => setFilter('')}>
          Tous
        </LinkStyled>
        <LinkStyled
          $selected={filter === PlatTypeEnum.PRINCIPAL}
          onClick={() => setFilter(PlatTypeEnum.PRINCIPAL)}
        >
          Principal
        </LinkStyled>
        <LinkStyled
          $selected={filter === PlatTypeEnum.ENTREE}
          onClick={() => setFilter(PlatTypeEnum.ENTREE)}
        >
          Entrée
        </LinkStyled>
        <LinkStyled
          $selected={filter === PlatTypeEnum.DESSERT}
          onClick={() => setFilter(PlatTypeEnum.DESSERT)}
        >
          Dessert
        </LinkStyled>
      </LeftLinks>
      <RightLinks>
        <div ref={ref2}>
          <LinkLogin
            $selected={isShoppingCard}
            onClick={() => setIsShoppingCard(true)}
          >
            <IconContainer>
              <ShoppingCartIconStyled />
              <Notif $visible={notif !== 0}>{notif}</Notif>
            </IconContainer>
            <ShoppingCard
              user={user}
              setShoppingEle={setShoppingEle}
              shoppingEle={shoppingEle}
              isOpen={isShoppingCard}
              setNotif={setNotif}
              setFilter={setFilter}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </LinkLogin>
        </div>

        {user ? (
          <div ref={ref}>
            <LinkLogin
              $selected={
                filter === 'account' ||
                filter === 'plat' ||
                filter === 'stock' ||
                filter === 'users'
              }
              onClick={openUserSetting}
            >
              <UserCircleIconStyled />
              {user.username}
            </LinkLogin>
            {isUserSetOpen && (
              <UserSetting>
                <LinkSetting
                  $selected={filter === 'account'}
                  onClick={() => setFilter('account')}
                >
                  Profil
                </LinkSetting>
                {user.role === 'admin' && (
                  <>
                    <LinkSetting
                      $selected={filter === 'plat'}
                      onClick={() => setFilter('plat')}
                    >
                      Ajouter un plat
                    </LinkSetting>
                    <LinkSetting
                      $selected={filter === 'aliment'}
                      onClick={() => setFilter('aliment')}
                    >
                      Ajouter un Aliment
                    </LinkSetting>
                    <LinkSetting
                      $selected={filter === 'stock'}
                      onClick={() => setFilter('stock')}
                    >
                      Gérer les stocks
                    </LinkSetting>
                    <LinkSetting
                      $selected={filter === 'users'}
                      onClick={() => setFilter('users')}
                    >
                      Gérer les utilisateurs
                    </LinkSetting>
                  </>
                )}
                <LinkSetting
                  $selected={false}
                  className='logout'
                  onClick={logout}
                >
                  Déconnexion
                </LinkSetting>
              </UserSetting>
            )}
          </div>
        ) : (
          <LinkLogin onClick={() => setIsLoginModalOpen(true)}>Login</LinkLogin>
        )}
      </RightLinks>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: white;
  border-bottom: solid 1px black;
  position: fixed;
  z-index: 9999;
`;

const LeftLinks = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LinkStyled = styled.a<{ $selected?: boolean }>`
  color: ${({ $selected }) => ($selected ? 'black' : 'grey')};
  font-size: 20px;
  border-bottom: solid 2px ${({ $selected }) => ($selected ? 'black' : 'white')};
  text-decoration: none;
  :hover {
    cursor: pointer;
    border-bottom: solid 2px
      ${({ $selected }) => ($selected ? 'black' : 'grey')};
  }
`;

const RightLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
`;

const LinkLogin = styled(LinkStyled)`
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  align-items: center;

  :hover {
    border-bottom: 0;
  }
`;

const UserCircleIconStyled = styled(UserCircleIcon)`
  width: 25px;
  height: 25px;
`;

const ShoppingCartIconStyled = styled(ShoppingCartIcon)`
  width: 25px;
  height: 25px;
  z-index: 10;
`;
const IconContainer = styled.div`
  position: relative;
`;

const Notif = styled.p<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -100%);
  padding: 2px;
  border-radius: 50%;
  background-color: brown;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  width: ${({ $visible }) => ($visible ? '15px' : '0px')};
  height: ${({ $visible }) => ($visible ? '15px' : '0px')};
  transition: all 0.2s;
`;

const UserSetting = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px grey;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .logout {
    border-top: solid 1px grey;
    :hover {
      background-color: brown;
    }
  }
`;

const LinkSetting = styled.a<{ $selected: boolean }>`
  transition: all 0.2s;
  padding: 15px 20px 15px 20px;
  text-align: center;
  background-color: ${({ $selected }) => ($selected ? 'black' : 'white')};
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  border-top: solid 1px rgba(0, 0, 0, 0.2);

  :hover {
    cursor: pointer;
    background-color: black;
    color: white;

    .logout {
      background-color: brown;
    }
  }
`;
