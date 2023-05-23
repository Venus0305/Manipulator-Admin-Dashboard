import type { LogoutOptions } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies } from 'react-cookie';
import { MANIPULATOR_ACCESS_TOKEN } from 'utils/config';

export const useAuth = () => {
  const {
    loginWithRedirect,
    isLoading,
    getAccessTokenSilently,
    logout: auth0Logout,
    isAuthenticated,
  } = useAuth0();

  const [cookies, setCookie, removeCookie] = useCookies([MANIPULATOR_ACCESS_TOKEN]);

  const setAccessToken = async () => {
    const accessToken = await getAccessTokenSilently();
    if (!accessToken) {
      throw new Error('Could not get access token');
    }

    setCookie(MANIPULATOR_ACCESS_TOKEN, accessToken);
  };

  const hasAccessToken = () => {
    return cookies[MANIPULATOR_ACCESS_TOKEN] !== undefined;
  };

  const getAccessToken = async () => {
    return getAccessTokenSilently();
  };

  const logout = (options?: LogoutOptions) => {
    if (!isAuthenticated) return;
    auth0Logout(options);
    removeCookie(MANIPULATOR_ACCESS_TOKEN);
  };

  return {
    isAuthenticated,
    setAccessToken,
    getAccessToken,
    logout,
    loginWithRedirect,
    isLoading,
    hasAccessToken,
  };
};
