import React, {
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { User } from "../../types";
import { useConfig } from "../../hooks/useConfig";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import { useCookies } from "react-cookie";
import { useSetIsBusy } from "../../state/app";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useConfig();
  const navigate = useNavigate();
  const [cookies, , deleteAuthToken] = useCookies(["auth"]);
  const fetchWithAuth = useFetchWithAuth();
  const setIsBusy = useSetIsBusy();
  const handleLogout = useCallback(() => {
    deleteAuthToken("auth");
    setUser(null);
    navigate("/");
    setIsBusy(false);
  }, [deleteAuthToken, navigate, setIsBusy]);

  const fetchUserDetails = useCallback(async () => {
    try {
      const data = await fetchWithAuth(`${OAUTH_URL}/userinfo`);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      handleLogout();
    }
  }, [OAUTH_URL, fetchWithAuth, handleLogout]);

  useEffect(() => {
    //changes to the auth token reset user status
    if (cookies.auth !== undefined) {
      setUser(undefined);
    }
  }, [cookies.auth]);

  useEffect(() => {
    const checkAuthToken = async () => {
      if (user === undefined) {
        if (cookies.auth != null) {
          await fetchUserDetails();
        } else {
          setUser(null);
        }
        setIsBusy(false);
      }
    };

    checkAuthToken();
  }, [fetchUserDetails, cookies.auth, user, setIsBusy]);

  const handleLogin = useCallback(async () => {
    const clientId = OAUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    const authUrl = `${OAUTH_URL}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = authUrl;
  }, [OAUTH_CLIENT_ID, OAUTH_URL]);

  const contextValue = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
