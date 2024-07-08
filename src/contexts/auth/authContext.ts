import { createContext } from "react";
import { User } from "../../types";

export interface AuthContextType {
  user: User | null | undefined;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
