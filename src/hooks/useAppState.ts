import { useContext } from "react";
import { AppContext } from "../contexts/app/appContext";

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppContext");
  }
  return context;
};
