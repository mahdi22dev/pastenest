import { createContext, useContext, useEffect, useState } from "react";

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
  setCurrentlocation: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [protectedloading, setprotectedLoading] = useState<boolean>(true);
  const [currentlocation, setCurrentlocation] = useState();

  const verfiyToken = async () => {
    try {
      setprotectedLoading(true);

      const url =
        process.env.NODE_ENV === "development"
          ? import.meta.env.VITE_LOCAL_SERVER_PATH
          : import.meta.env.VITE_SERVER_PATH;

      const respnse = await fetch(url + "/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });

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

  useEffect(() => {
    verfiyToken();
  }, [currentlocation]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        protectedloading,
        verfiyToken,
        setCurrentlocation,
      }}
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
