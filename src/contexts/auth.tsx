import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAuthLoginController} from '../controller/userController';
import {ResponseUser} from '../dto/login';
import {AuthContextData, User} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      setUser(null);
      setLoading(true);
      const storagUser = await AsyncStorage.getItem('@TestAuth:user');
      const storagToken = await AsyncStorage.getItem('@TestAuth:token');
      setLoading(!!storagUser);
      if (storagUser && storagToken) {
        setUser({email: storagUser});
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const signIn = async (userEmail: string) => {
    const response: ResponseUser = await getAuthLoginController(userEmail);
    if (response) {
      setLoading(false);
      setUser({email: userEmail});
      AsyncStorage.setItem('@TestAuth:user', userEmail);
      AsyncStorage.setItem('@TestAuth:token', response.token);
    } else {
      console.log('erro', response);
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    AsyncStorage.removeItem('@TestAuth:user');
    AsyncStorage.removeItem('@TestAuth:token');
    return;
  };

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
