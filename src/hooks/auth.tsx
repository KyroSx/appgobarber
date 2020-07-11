import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: Record<string, unknown>;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: Record<string, unknown>;
  signIn(credentials: Credentials): Promise<void>;
  singOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const tokenStorageItem = '@GoBarber:token';
  const userStorageItem = '@GoBarber:user';

  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData() {
      const [tokenArray, userArray] = await AsyncStorage.multiGet([
        tokenStorageItem,
        userStorageItem,
      ]);

      const token = tokenArray[1];
      const user = userArray[1];

      if (token && user) {
        setData({
          token,
          user: JSON.parse(user),
        });
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: Credentials) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      [tokenStorageItem, token],
      [userStorageItem, JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const singOut = useCallback(async () => {
    await AsyncStorage.multiRemove([tokenStorageItem, userStorageItem]);

    setData({} as AuthState);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ signIn, user: data.user, singOut }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Context must be used with an provider');

  return context;
}
