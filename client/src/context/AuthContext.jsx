import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const initialAuth = JSON.parse(localStorage.getItem('pizzaflow-auth') || 'null');

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialAuth);
  const user = auth?.user || null;

  const login = (nextAuth) => {
    if (!nextAuth?.user || !nextAuth?.token) return;
    setAuth(nextAuth);
    localStorage.setItem('pizzaflow-auth', JSON.stringify(nextAuth));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('pizzaflow-auth');
  };

  const value = useMemo(() => ({ user, token: auth?.token || null, login, logout }), [auth, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
