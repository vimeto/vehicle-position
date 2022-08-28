import React from 'react';
import { NotificationAction } from '@entities/notification/types';

export const NotificationDispatchContext = React.createContext<React.Dispatch<NotificationAction>>(() => null);

export const useNotificationDispatch = () => {
  const context = React.useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error('useNotificationDispatch must be used within a NotificationProvider');
  }

  return context;
};
