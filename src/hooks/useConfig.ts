import { useContext } from "react";
import { ConfigContext } from "../contexts/configuration/configContext";

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
