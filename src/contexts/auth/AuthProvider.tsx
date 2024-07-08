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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useConfig();
  const navigate = useNavigate();
  const [cookies, , deleteAuthToken] = useCookies(["auth"]);
  const fetchWithAuth = useFetchWithAuth();

  const handleLogout = useCallback(() => {
    deleteAuthToken("auth");
    setUser(null);
    navigate("/");
  }, [deleteAuthToken, navigate]);

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
    if (cookies.auth != null) {
      fetchUserDetails();
    } else {
      setUser(null);
    }
  }, [fetchUserDetails, cookies.auth]);

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
