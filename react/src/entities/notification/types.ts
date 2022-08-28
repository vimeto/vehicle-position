interface ApiNotificationTranslationParams {
  object_class_name: string;
  id: number;
  name: string;
}

type ApiNotificationWithParams = {
  key: string;
  [translationParamKey: string]: ApiNotificationTranslationParams[] | string;
};

type ApiNotification = ApiNotificationWithParams | string;

interface Notification {
  title: string;
  message: ApiNotification;
  severity: MessageSeverity;
  id: number | string;
}
interface NotificationState {
  notifications: Notification[];
}

enum MessageSeverity {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

enum NotificationActionTypes {
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  REMOVE_NOTIFICATION_BY_ID = 'REMOVE_NOTIFICATION_BY_ID',
}

interface ShowNotificationAction {
  type: typeof NotificationActionTypes.SHOW_NOTIFICATION;
  payload: { notification: Notification };
}

interface RemoveNotificationAction {
  type: typeof NotificationActionTypes.REMOVE_NOTIFICATION;
}

interface RemoveNotificationByIdAction {
  type: typeof NotificationActionTypes.REMOVE_NOTIFICATION_BY_ID;
  payload: { id: number | string };
}

type NotificationAction = ShowNotificationAction | RemoveNotificationAction | RemoveNotificationByIdAction;

const DefaultNotificationStateValue: NotificationState = { notifications: [] };

export {
  NotificationState,
  Notification,
  NotificationAction,
  NotificationActionTypes,
  ShowNotificationAction,
  MessageSeverity,
  RemoveNotificationAction,
  DefaultNotificationStateValue,
  RemoveNotificationByIdAction,
  ApiNotificationWithParams,
  ApiNotificationTranslationParams,
  ApiNotification,
};
