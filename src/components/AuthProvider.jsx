import { createContext, useContext, useState } from 'react';

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
  return (
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};
