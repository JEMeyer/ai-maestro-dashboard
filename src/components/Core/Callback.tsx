import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEnvironmentVariables } from "../../hooks/useEnvironmentVariables";
import { useSetIsBusy, useUserValue } from "../../state/app";
import { useSetAuthToken } from "../../state/auth";

const Callback: React.FC = () => {
  const setAuthToken = useSetAuthToken();
  const user = useUserValue();
  const location = useLocation();
  const navigate = useNavigate();
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useEnvironmentVariables();
  const setIsBusy = useSetIsBusy();

  useEffect(() => {
    setIsBusy(true);
  }, [setIsBusy]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const fetchToken = async (code: string) => {
      try {
        const response = await fetch(`${OAUTH_URL}/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: OAUTH_CLIENT_ID,
            code,
          }),
        });

        const data = await response.json();

        setAuthToken(data.access_token);
      } catch (error) {
        console.error("Error fetching token", error);
        // TODO redirect to error page
      }
    };
    if (code != null) {
      fetchToken(code);
    }
  }, [OAUTH_CLIENT_ID, OAUTH_URL, location.search, navigate, setAuthToken]);

  // Wait until the auth is actually updated to redirect to /dashboard
  useEffect(() => {
    if (user != null) {
      navigate("/configuration");
    }
  }, [user, navigate]);

  return <></>;
};

export default Callback;
