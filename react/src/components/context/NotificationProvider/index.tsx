import React from 'react';
import { notificationReducer } from '@entities/notification/notificationReducer';
import { NotificationStateContext } from './NotificationStateContext';
import { NotificationDispatchContext } from './NotificationDispatchContext';

const NotificationProvider: React.FC = ({ children }) => {
  const [notificationState, dispatch] = React.useReducer(notificationReducer, { notifications: [] });

  return (
    <NotificationStateContext.Provider value={notificationState}>
      <NotificationDispatchContext.Provider value={dispatch}>{children}</NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

export default NotificationProvider;
