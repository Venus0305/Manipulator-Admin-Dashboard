import { Space, Spin } from 'antd';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';

export interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { hasAccessToken, setAccessToken, isAuthenticated, loginWithRedirect, isLoading } =
    useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && !hasAccessToken()) {
        setAccessToken();
      } else if (!isAuthenticated && !hasAccessToken()) {
        loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !isAuthenticated || !hasAccessToken())
    return (
      <Space style={{ width: '100vw', height: '100vh', justifyContent: 'center' }}>
        <Spin size="large" />
      </Space>
    );
  return children;
};

export default PrivateRoute;
