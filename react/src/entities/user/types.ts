
interface User {
  id: number;
  email: string;
}
interface UserData {
  user: User;
}
interface CurrentUserState {
  user: User | null;
  isAuthenticated: boolean;
}

enum CurrentUserActionTypes {
  SAVE_USER = 'SAVE_USER',
}
interface StoreCurrentUserAction {
  type: CurrentUserActionTypes.SAVE_USER;
  payload: { user: User | null };
}
type CurrentUserAction = StoreCurrentUserAction;

export { CurrentUserState, CurrentUserActionTypes, CurrentUserAction, User, UserData, StoreCurrentUserAction };
