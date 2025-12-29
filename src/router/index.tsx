import { FC } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routesConfig from '@/router/routesConfig';

const Router: FC = () => {
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
};

export default Router;
