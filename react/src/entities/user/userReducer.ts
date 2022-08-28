import { CurrentUserState, CurrentUserAction, CurrentUserActionTypes } from './types';

export const userReducer = (initialState: CurrentUserState, action: CurrentUserAction): CurrentUserState => {
  switch (action.type) {
    case CurrentUserActionTypes.SAVE_USER:
      return {
        ...initialState,
        user: action.payload.user,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
