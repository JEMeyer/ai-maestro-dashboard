import React, { ReactNode } from "react";
import { ConfigContext } from "./configContext";

interface ConfigProviderProps {
  children: ReactNode;
}

const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AUTH_CLIENT_ID: import.meta.env.VITE_AUTHENTIK_CLIENT_ID,
  AUTH_URL: import.meta.env.VITE_AUTHENTIK_URL,
  AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTHENTIK_CLIENT_SECRET,
};

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export { ConfigProvider };
