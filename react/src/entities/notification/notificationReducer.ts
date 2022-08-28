import { Notification, NotificationState, NotificationAction, NotificationActionTypes, MessageSeverity } from './types';

export const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification],
      };

    case NotificationActionTypes.REMOVE_NOTIFICATION: {
      const notificationToDelete = state.notifications.find(
        (notification: Notification) => notification.severity !== MessageSeverity.Error,
      );
      if (notificationToDelete) {
        return {
          ...state,
          notifications: state.notifications.filter((notification) => notification.id !== notificationToDelete.id),
        };
      }

      return state;
    }

    case NotificationActionTypes.REMOVE_NOTIFICATION_BY_ID:
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload.id),
      };

    default:
      return state;
  }
};
