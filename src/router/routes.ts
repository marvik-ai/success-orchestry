const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  EMPLOYEES: '/employees',
  EDIT_EMPLOYEE: '/employees/:id/edit',
  ERROR_404: '/404',
  ERROR_500: '/500',
  BASE: '/',
  DEFAULT: '*',
};

export default ROUTES;
