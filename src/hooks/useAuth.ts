import { useCallback, useEffect } from "react";
import { useSetIsBusy, useSetUser, useUserValue } from "../state/app";
import { useFetchWithAuth } from "./useFetchWithAuth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEnvironmentVariables } from "../state/env";

export const useAuth = () => {
  const user = useUserValue();
  const setUser = useSetUser();
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useEnvironmentVariables();
  const navigate = useNavigate();
  const [cookies, , deleteAuthToken] = useCookies(["auth"]);
  const fetchWithAuth = useFetchWithAuth();
  const setIsBusy = useSetIsBusy();

  const handleLogout = useCallback(() => {
    deleteAuthToken("auth");
    setUser(null);
    navigate("/");
    setIsBusy(false);
  }, [deleteAuthToken, navigate, setIsBusy, setUser]);

  const fetchUserDetails = useCallback(async () => {
    try {
      const data = await fetchWithAuth(`${OAUTH_URL}/userinfo`);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      handleLogout();
    }
  }, [OAUTH_URL, fetchWithAuth, handleLogout, setUser]);

  useEffect(() => {
    //changes to the auth token reset user status
    if (cookies.auth !== undefined) {
      setUser(undefined);
    }
  }, [cookies.auth, setUser]);

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
  }, [fetchUserDetails, cookies.auth, user, setIsBusy, setUser]);

  const handleLogin = useCallback(async () => {
    const clientId = OAUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    const authUrl = `${OAUTH_URL}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = authUrl;
  }, [OAUTH_CLIENT_ID, OAUTH_URL]);

  return { handleLogin, handleLogout };
};
