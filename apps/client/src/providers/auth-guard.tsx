import { createContext, useContext, useState } from "react";

interface User {
  id: number;
  user: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  protectedloading: boolean;
  verfiyToken: () => Promise<User | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [protectedloading, setprotectedLoading] = useState<boolean>(true);
  const verfiyToken = async () => {
    try {
      setprotectedLoading(true);
      const respnse = await fetch("/api/auth/verify");
      const user = (await respnse.json()) as User;
      if (respnse.status == 202) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      return user;
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setprotectedLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, protectedloading, verfiyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
