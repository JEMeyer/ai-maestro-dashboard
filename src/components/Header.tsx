import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useSetIsBusy } from "../state/app";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;

  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Nav = styled.nav<{ $isMenuOpen: boolean }>`
  display: flex;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #282c34;
    padding: 1rem 0;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #61dafb;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  div {
    width: 100%;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
    flex-grow: 1;
  }
`;

const UserName = styled.span`
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.5rem;
  }
`;

const Header: React.FC = () => {
  const { handleLogin, handleLogout, user } = useAuth();
  const setIsBusy = useSetIsBusy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>Maestro Dashboard</Logo>
      <Hamburger onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Nav $isMenuOpen={isMenuOpen}>
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/config" onClick={() => setIsMenuOpen(false)}>
          Config Editor
        </NavLink>
        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
          Contact
        </NavLink>
      </Nav>
      <UserInfo>
        {user ? (
          <>
            <UserName>{user.name}</UserName>
            <Button
              id="loginLogoutButton"
              onClick={() => {
                setIsBusy(true);
                handleLogout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            id="loginLogoutButton"
            onClick={() => {
              setIsBusy(true);
              handleLogin();
            }}
          >
            Login
          </Button>
        )}
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
