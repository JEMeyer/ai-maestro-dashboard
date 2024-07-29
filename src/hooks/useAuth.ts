import { useCallback, useEffect } from "react";
import { useSetIsBusy, useSetUser, useUserValue } from "../state/app";
import { useNavigate } from "react-router-dom";
import { useEnvironmentVariables } from "./useEnvironmentVariables";
import { useFetchWithAuth } from "./useFetchWithAuth";
import { useAuthToken, useSetAuthToken } from "../state/auth";

export const useAuth = () => {
  const user = useUserValue();
  const setUser = useSetUser();
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useEnvironmentVariables();
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();
  const setAuthToken = useSetAuthToken();
  const authToken = useAuthToken();

  const setIsBusy = useSetIsBusy();

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    navigate("/");
    setIsBusy(false);
  }, [setAuthToken, navigate, setIsBusy, setUser]);

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
    if (authToken != null) {
      setUser(undefined);
    }
  }, [authToken, setUser]);

  useEffect(() => {
    const checkAuthToken = async () => {
      if (user === undefined) {
        if (authToken != null) {
          await fetchUserDetails();
        } else {
          setUser(null);
        }
        setIsBusy(false);
      }
    };

    checkAuthToken();
  }, [fetchUserDetails, user, setIsBusy, setUser, authToken]);

  const handleLogin = useCallback(async () => {
    const clientId = OAUTH_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    const authUrl = `${OAUTH_URL}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = authUrl;
  }, [OAUTH_CLIENT_ID, OAUTH_URL]);

  return { handleLogin, handleLogout };
};
