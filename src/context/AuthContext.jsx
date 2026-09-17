// AuthContext.jsx
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const loginSession = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData); // Persistir sesión al recargar
  };

  const logoutSession = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginSession, logoutSession }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook defensivo (Lanza error descriptivo si se usa fuera de AuthProvider)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un <AuthProvider>');
  }
  return context;
};