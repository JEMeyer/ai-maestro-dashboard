import React, { ReactNode, useState } from "react";
import { AppContext } from "./appContext";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isBusy, setIsBusy] = useState(false);

  return (
    <AppContext.Provider value={{ isBusy, setIsBusy }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
