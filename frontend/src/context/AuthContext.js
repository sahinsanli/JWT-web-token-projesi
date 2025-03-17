import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Remove the interceptor since the cookie is automatically sent
    // withCredentials: true is sufficient
    axios
      .get("http://localhost:3080/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
      });
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
