import { Api } from '@entities/api';
import { EndpointUrl } from '../api/types';
import { CurrentUserActionTypes, StoreCurrentUserAction, UserData, User } from './types';

const api = new Api();

const getCurrentUserAction = async (setLoading: (value: boolean) => void) => {
  const response = await api.get<UserData>(EndpointUrl.userSettings, setLoading);

  return {
    user: response.data.user,
    errors: response.errors,
  };
};

const storeUser = (user: User | null): StoreCurrentUserAction => {
  return {
  type: CurrentUserActionTypes.SAVE_USER,
  payload: { user },
  }
};

export { getCurrentUserAction, storeUser };
