import { createContext } from "react";

export interface ConfigContextType {
  API_BASE_URL: string;
  AUTH_CLIENT_ID: string;
  AUTH_URL: string;
  AUTH_CLIENT_SECRET: string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export { ConfigContext };
