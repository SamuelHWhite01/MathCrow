import { createContext, useContext } from 'react';
import UserData from '../types/UserData';

export const UserDataContext = createContext<
  | {
      userData: UserData;
      setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    }
  | undefined
>(undefined);

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserDataContext must be used within a userUserDataProvider');
  }
  return context;
}
