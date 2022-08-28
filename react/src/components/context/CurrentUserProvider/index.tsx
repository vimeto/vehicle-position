import React from 'react';
import { userReducer } from '@entities/user/userReducer';
import { CurrentUserStateContext } from './CurrentUserStateContext';
import { CurrentUserDispatchContext } from './CurrentUserDispatchContext';

const CurrentUserProvider: React.FC = ({ children }) => {
  const [userState, dispatch] = React.useReducer(userReducer, { user: null, isAuthenticated: false });

  return (
    <CurrentUserStateContext.Provider value={userState}>
      <CurrentUserDispatchContext.Provider value={dispatch}>{children}</CurrentUserDispatchContext.Provider>
    </CurrentUserStateContext.Provider>
  );
};

export default CurrentUserProvider;
