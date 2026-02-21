import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { useTokenExpiration } from "../hooks/useTokenExpiration";

// types.ts
interface User {
  id: string;
  name: string;
  token: string;
  role?: string;
}

interface AppContextType {
  auth: User | null;
  setCredentials: (user: User) => void;
  logout: () => void;
  isTokenExpired: boolean;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [auth, setAuth] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setAuth(null);
  }, []);

  const setCredentials = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setAuth(user);
  };

  const isTokenExpired = useTokenExpiration(auth?.token, logout);

  return (
    <AppContext.Provider value={{ auth, setCredentials, logout, isTokenExpired }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "⚠️ AppContext is missing! Make sure your component is wrapped inside <AppProvider>."
    );
  }
  return context;
};