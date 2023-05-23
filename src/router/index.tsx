import Root from 'containers';
import PageLayout from 'containers/Layout';
import NotFoundPage from 'containers/NotFoundPage';
import type { RouteObject } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from './adminRoutes';
import PrivateRoute from './PrivateRoutes';
import type { AntRoute } from './types';

export const indexRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        errorElement: <NotFoundPage />,
        element: (
          <PrivateRoute>
            <PageLayout />
          </PrivateRoute>
        ),
        children: adminRoutes,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const routes = [...indexRoutes, ...adminRoutes];

export const convertToMenuRoutes = (routeArr: (RouteObject & AntRoute)[]): AntRoute[] => {
  return routeArr.map((route) => ({
    ...route,
    ...(Array.isArray(route.children) ? { routes: convertToMenuRoutes(route.children) } : {}),
  }));
};

export const sideMenuRoutes = convertToMenuRoutes(adminRoutes);

export default routes;

export const router = createBrowserRouter(routes);
