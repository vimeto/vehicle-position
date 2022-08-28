import React, { ComponentProps, FC } from 'react';
import CurrentUserProvider from './CurrentUserProvider';
import NotificationProvider from './NotificationProvider';

const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};
const providers = [CurrentUserProvider, NotificationProvider];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;
