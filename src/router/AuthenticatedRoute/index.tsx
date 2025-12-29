import { ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import config from '@/config';
import ROUTES from '@/router/routes';
import { useAppSelector } from '@/store';
import { selectAuthToken } from '@/store/selectors/authSelector';

type AuthenticatedRouteProps = {
  children: ReactElement;
};

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const token = useAppSelector(selectAuthToken);

  if (!config.authEnabled) {
    return children;
  }

  return token ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

export default AuthenticatedRoute;
