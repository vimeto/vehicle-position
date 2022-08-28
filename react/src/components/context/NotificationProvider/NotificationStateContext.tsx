import React from 'react';
import { NotificationState, DefaultNotificationStateValue } from '@entities/notification/types';

export const NotificationStateContext = React.createContext<NotificationState>(DefaultNotificationStateValue);

export function useNotificationState() {
  const context = React.useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error('useNotificationState must be used within a NotificationProvider');
  }

  return context;
}
