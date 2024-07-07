import React, {
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "./authContext";
import { User } from "../../types";
import { useConfig } from "../../hooks/useConfig";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { AUTH_URL } = useConfig();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    Cookies.remove("access_token");
    setUser(null);
    setIsLoading(false);
    navigate("/");
  }, [navigate]);

  const fetchUserDetails = useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${AUTH_URL}/application/o/userinfo/?access_token=${token}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    },
    [AUTH_URL, logout]
  );

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUserDetails(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchUserDetails]);

  const login = useCallback(
    async (token: string) => {
      Cookies.set("access_token", token, { expires: 1 });
      await fetchUserDetails(token);
    },
    [fetchUserDetails]
  );

  const isAuthenticated = !!user;

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
      setIsLoading,
    }),
    [user, isAuthenticated, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
