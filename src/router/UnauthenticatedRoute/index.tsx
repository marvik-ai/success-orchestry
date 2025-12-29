import { ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import config from '@/config';
import ROUTES from '@/router/routes';
import { useAppSelector } from '@/store';
import { selectAuthToken } from '@/store/selectors/authSelector';

type UnauthenticatedRouteProps = {
  children: ReactElement;
};

const UnauthenticatedRoute = ({ children }: UnauthenticatedRouteProps) => {
  const token = useAppSelector(selectAuthToken);

  if (!config.authEnabled) {
    return children;
  }

  return token ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

export default UnauthenticatedRoute;
