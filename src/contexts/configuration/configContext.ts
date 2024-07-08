import { createContext } from "react";

export interface ConfigContextType {
  API_BASE_URL: string;
  OAUTH_URL: string;
  OAUTH_CLIENT_ID: string;
}
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export { ConfigContext };
