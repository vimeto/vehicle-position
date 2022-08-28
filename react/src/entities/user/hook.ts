import { useState, useEffect } from 'react';
import { getCurrentUserAction } from './actions';
import { User } from './types';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    const { user } = await getCurrentUserAction(setLoading);
    setCurrentUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { currentUser, loading };
};

export { useCurrentUser };
