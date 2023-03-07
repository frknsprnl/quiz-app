import React, { createContext, useState, useEffect } from "react";

interface User {
  biography: string;
  firstName: string;
  lastName: string;
  score: number;
  userName: string;
  profilePictureUrl: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
}); 

const AuthContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const setNewUser = (user: any) => {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return React.useContext(AuthContext);
};

export default AuthContextProvider;
