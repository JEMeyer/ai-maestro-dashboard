import OAuth2Login, { OAuth2LoginProps } from "react-simple-oauth2-login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useConfig } from "../hooks/useConfig";

const LoginLogoutButton = () => {
  const navigate = useNavigate();
  const { AUTH_URL, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } = useConfig();
  const { login, logout, isAuthenticated, setIsLoading } = useAuth();

  const onSuccess: OAuth2LoginProps["onSuccess"] = async (response) => {
    const code = response.code;
    if (code) {
      try {
        setIsLoading(true);
        const tokenResponse = await fetch(`${AUTH_URL}/application/o/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: `${window.location.origin}`,
            client_id: AUTH_CLIENT_ID,
            client_secret: AUTH_CLIENT_SECRET,
          }),
        });
        const tokenData = await tokenResponse.json();
        if (tokenData.access_token) {
          await login(tokenData.access_token);
          navigate("/dashboard");
        } else {
          console.error("Access token is missing in the response");
        }
      } catch (error) {
        console.error(
          "Failed to exchange authorization code for access token",
          error
        );
        setIsLoading(false);
      }
    } else {
      console.error("Authorization code is missing in the response");
    }
  };

  const onFailure: OAuth2LoginProps["onFailure"] = (err: Error) => {
    console.error("Login failed:", err);
  };

  return (
    <>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <OAuth2Login
          authorizationUrl={`${AUTH_URL}/application/o/authorize/`}
          responseType="code"
          clientId={AUTH_CLIENT_ID}
          redirectUri={window.location.origin}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      )}
    </>
  );
};

export default LoginLogoutButton;
