import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useConfig } from "../hooks/useConfig";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

const Callback: React.FC = () => {
  const [, setCookie] = useCookies(["auth"]);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { OAUTH_URL, OAUTH_CLIENT_ID } = useConfig();

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
        let cookieOptions: {
          path: string;
          secure: boolean;
          sameSite: boolean | "none" | "lax" | "strict" | undefined;
        };
        if (process.env.NODE_ENV === "production") {
          // Production environment: Secure and SameSite options are set for security purposes
          cookieOptions = { path: "/", secure: true, sameSite: "none" };
        } else {
          // Development environment: No restrictions on secure connections or SameSite policy
          cookieOptions = { path: "/", secure: false, sameSite: "lax" };
        }

        setCookie("auth", data.access_token, cookieOptions);
      } catch (error) {
        console.error("Error fetching token", error);
        // TODO redirect to error page
      }
    };
    if (code != null) {
      fetchToken(code);
    }
  }, [OAUTH_CLIENT_ID, OAUTH_URL, location.search, navigate, setCookie]);

  // Wait until the auth is actually updated to redirect to /dashboard
  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <Loading />;
};

export default Callback;