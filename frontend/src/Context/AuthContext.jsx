// src/context/AuthContext.jsx or .js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user info
  const [role, setRole] = useState(null); // store user role: "admin" or "user"

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 👇 This must exist
export const useAuth = () => useContext(AuthContext);
