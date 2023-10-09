/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, createContext, useState, useEffect, FC } from 'react';

import { getStoredToken, getUserData } from '@/utils/misc';
// import { useRouter } from 'next/navigation';
import PageLoader from '@/components/PageLoader';
;

type AuthContextProps = {
  children: ReactNode;
};

export type IUser =  {
  id: string;
  name: string;
  email: string;
  profileImg?: string,
  coverImg?: string,
}

type AuthContext = {
  user: IUser | null;
  reset: () => void;
  updateUser: (user: IUser) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  reset: () => {},
  updateUser: () => {},
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  // const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const reset = () => {
    setUser(null); // set user
    
  };

  const updateUser = (user: IUser) => setUser((u) => ({ ...u, ...user }));

  const setupSession = () => {
    setLoading(true);
    const localToken = getStoredToken();
    const userData = getUserData();
    console.log('here')
    if (localToken && userData) {
      setUser(JSON.parse(userData))
    }
    // else router.push("/login")
    setLoading(false)
  }

  useEffect(() => {
   setupSession() 
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, reset, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
