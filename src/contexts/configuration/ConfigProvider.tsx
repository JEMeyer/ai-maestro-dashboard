import React, { ReactNode } from "react";
import { ConfigContext } from "./configContext";

interface ConfigProviderProps {
  children: ReactNode;
}

const config = {
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ?? "REACT_APP_API_BASE_URL_PLACEHOLDER",
  AUTH_CLIENT_ID:
    process.env.REACT_APP_AUTHENTIK_CLIENT_ID ??
    "REACT_APP_AUTHENTIK_CLIENT_ID_PLACEHOLDER",
  AUTH_URL:
    process.env.REACT_APP_AUTHENTIK_URL ??
    "REACT_APP_AUTHENTIK_URL_PLACEHOLDER",
  AUTH_CLIENT_SECRET:
    process.env.REACT_APP_AUTHENTIK_CLIENT_SECRET ??
    "REACT_APP_AUTHENTIK_CLIENT_SECRET_PLACEHOLDER",
};

console.log("Config:", config);

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export { ConfigProvider };
