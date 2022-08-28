import React from 'react';
import { CurrentUserAction } from '@entities/user/types';

export const CurrentUserDispatchContext = React.createContext<React.Dispatch<CurrentUserAction>>(() => null);

export const useCurrentUserDispatch = () => {
  const context = React.useContext(CurrentUserDispatchContext);
  if (context === undefined) {
    throw new Error('useCurrentUserDispatch must be used within a AuthProvider');
  }

  return context;
};
