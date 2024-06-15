/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { UserAPI } from '../api/userAPI';
import { useNavigate } from 'react-router-dom';
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
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await UserAPI.getUser(user.uid)
        const localId = res.data.uid;
        const {phoneNumber, dateOfBirth, role, gender} = res.data
        localStorage.setItem('currentUser', JSON.stringify({...user, localId, phoneNumber, dateOfBirth, role, gender}));
        setCurrentUser({...user, localId, phoneNumber, dateOfBirth, role, gender});
      }
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
