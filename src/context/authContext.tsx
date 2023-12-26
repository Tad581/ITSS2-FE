/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ContextType {
  currentUser: any;
}

export const AuthContext = createContext<ContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthContextProvider = ({ children }: { children: any }) => {
  const storageCurrentUser = localStorage.getItem('currentUser');

  const [currentUser, setCurrentUser] = useState<any>(
    storageCurrentUser ? JSON.parse(storageCurrentUser) : {}
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
