import React, { ReactNode } from "react";
import { ConfigContext } from "./configContext";

interface ConfigProviderProps {
  children: ReactNode;
}

const config = {
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ?? "REACT_APP_API_BASE_URL_PLACEHOLDER",
  OAUTH_URL:
    process.env.REACT_APP_OAUTH_URL ?? "REACT_APP_OAUTH_URL_PLACEHOLDER",
  OAUTH_CLIENT_ID:
    process.env.REACT_APP_OAUTH_CLIENT_ID ??
    "REACT_APP_OAUTH_CLIENT_ID_PLACEHOLDER",
};

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export { ConfigProvider };
