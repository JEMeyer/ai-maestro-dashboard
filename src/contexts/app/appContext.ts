import { createContext } from "react";

export interface AppContextType {
  isBusy: boolean;
  setIsBusy: (isBusy: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export { AppContext };
