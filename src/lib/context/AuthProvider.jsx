/* eslint-disable react/prop-types */
import React, {useState,createContext } from "react";

export const AuthContext = createContext();
const Provider = AuthContext.Provider;

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({
    userInfo: {},
    token:null
  });
  const isAuthenticated = () => authInfo.token !== null;
  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo }}>
      {children}
    </Provider>
  );
}
