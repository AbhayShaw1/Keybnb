import { createContext, useContext, useEffect, useState } from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within the AuthProvider');
  }
  return authContext;
};
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };
    fetchToken();
  }, []);
  return (
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};
