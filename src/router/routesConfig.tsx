import { Navigate, RouteObject } from 'react-router-dom';

import App from '@/App';
import { AppLayout } from '@/layout';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from '@/pages/auth';
import { DashboardPage } from '@/pages/dashboard';
import { EmployeesPage } from '@/pages/employees';
import { NotFoundPage } from '@/pages/error';
import { UsersPage } from '@/pages/users';

import ROUTES from './routes';

const routesConfig: RouteObject[] = [
  {
    path: ROUTES.BASE,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.USERS,
            element: <UsersPage />,
          },
          {
            path: ROUTES.EMPLOYEES,
            element: <EmployeesPage />,
          },
        ],
      },
      {
        path: ROUTES.DEFAULT,
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routesConfig;
