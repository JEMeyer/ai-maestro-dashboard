import styled from "styled-components";
import { useAppState } from "../hooks/useAppState";
import { useAuth } from "../hooks/useAuth";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 1rem;
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
`;

const Header: React.FC = () => {
  const { handleLogin, handleLogout, user } = useAuth();
  const { setIsBusy } = useAppState();

  return (
    <HeaderContainer>
      <Logo>Maestro Dashboard</Logo>
      <UserInfo>
        {user ? (
          <>
            <UserName>{user.name}</UserName>
            <Button
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
