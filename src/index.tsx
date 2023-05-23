import 'styles/global.css';
import 'utils/yup.config';

import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'router';
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_REDIRECT_URI } from 'utils/config';
import queryClient from 'utils/queryClient';

import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        authorizationParams={{
          audience: AUTH0_AUDIENCE,
          redirect_uri: AUTH0_REDIRECT_URI,
          logoUrl: 'https://admin.manipulator-dev.scrum-dev.com/images/logo.svg',
        }}
        cacheLocation="localstorage"
        clientId={AUTH0_CLIENT_ID}
        domain={AUTH0_DOMAIN}
        useRefreshTokens
      >
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>,
);

reportWebVitals();
