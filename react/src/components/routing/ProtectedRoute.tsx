import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { PagePath } from './type';

const ProtectedRoute: React.FC<RouteProps> = (routeProps) => {
  const isAuthenticated = true;
  const isAuthorized = true;
  if (!isAuthenticated) {
    return <Redirect to={{ pathname: PagePath.Login }} />;
  }
  if (!isAuthorized) {
    return <Redirect to={{ pathname: PagePath.UnAuthorizedRoute }} />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
