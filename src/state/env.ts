import { useMemo } from "react";

export interface EnvironmentVariables {
  API_BASE_URL: string;
  OAUTH_URL: string;
  OAUTH_CLIENT_ID: string;
}

export const useEnvironmentVariables = () => {
  return useMemo(() => {
    return {
      API_BASE_URL:
        process.env.REACT_APP_API_BASE_URL ??
        "REACT_APP_API_BASE_URL_PLACEHOLDER",
      OAUTH_URL:
        process.env.REACT_APP_OAUTH_URL ?? "REACT_APP_OAUTH_URL_PLACEHOLDER",
      OAUTH_CLIENT_ID:
        process.env.REACT_APP_OAUTH_CLIENT_ID ??
        "REACT_APP_OAUTH_CLIENT_ID_PLACEHOLDER",
    };
  }, []);
};
