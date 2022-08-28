import React from 'react';
import { CurrentUserState } from '@entities/user/types';

export const CurrentUserStateContext = React.createContext<CurrentUserState>({
  user: null,
  isAuthenticated: false,
});

export function useCurrentUserState() {
  const context = React.useContext(CurrentUserStateContext);
  if (context === undefined) {
    throw new Error('useCurrentUserState must be used within a CurrentUserProvider');
  }

  return context;
}
