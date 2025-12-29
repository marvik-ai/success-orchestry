import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import ROUTES from '@/router/routes';
import { useAppSelector } from '@/store';
import { selectCurrentUserRoleId } from '@/store/selectors/authSelector';

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: Array<string | number>;
};

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const roleId = useAppSelector(selectCurrentUserRoleId);

  if (!roleId) {
    return null;
  }

  const hasAccess = allowedRoles.includes(roleId);

  return hasAccess ? children : <Navigate to={ROUTES.BASE} replace />;
};
