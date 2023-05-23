import { LogoutOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-layout';
import { Button, Spin, Tooltip, Typography } from 'antd';
import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import LngDropdown from 'components/SwitchLang';
import { useUser } from 'hooks';
import useLogout from 'models/auth/useLogout';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { sideMenuRoutes } from 'router';

const PageLayout = () => {
  const { data } = useUser();
  const { logout, context } = useLogout();
  const { t } = useTranslation();

  return (
    <div id="pro-layout">
      <ProLayout
        ErrorBoundary={false}
        breadcrumbRender={(routers) =>
          routers.map((route, index) => ({
            ...route,
            path: undefined,
            title:
              index < routers.length - 1 ? (
                <Link
                  key={`router-breadcrumb-${index}`}
                  to={(route as BreadcrumbItemType).path || '/'}
                >
                  {(route as BreadcrumbItemType).title}
                </Link>
              ) : (
                (route as BreadcrumbItemType).title
              ),
          }))
        }
        colorPrimary="#1890ff"
        formatMessage={(message) => {
          return t(message.defaultMessage || '');
        }}
        headerTitleRender={(logo) => logo}
        layout="mix"
        logo={
          <Link to="/dashboard">
            <img src="/images/logo.svg" />
          </Link>
        }
        menuItemRender={(menuItem, defaultDom) => {
          return (
            <Link key={menuItem.path} to={menuItem.path || '/'}>
              {defaultDom}
            </Link>
          );
        }}
        rightContentRender={() => (
          <div className="flex items-center gap-4">
            <Typography>{data?.name || data?.email}</Typography>
            <LngDropdown />
            <Tooltip placement="bottomRight" title={t('confirmation:logout.title')}>
              <Button icon={<LogoutOutlined />} onClick={logout} shape="circle" />
            </Tooltip>
          </div>
        )}
        route={{ routes: sideMenuRoutes }}
        token={{
          sider: {
            colorTextMenuSelected: '#1890ff',
            colorBgMenuItemSelected: '#e6f7ff',
            colorMenuBackground: '#FFF',
            colorTextMenuItemHover: '#1890ff',
            colorBgMenuItemHover: '#FFF',
            colorTextMenu: '#000',
          },
          header: {
            colorBgHeader: '#FFFFFF',
          },
          pageContainer: {
            colorBgPageContainer: '#f0f2f5',
            paddingInlinePageContainerContent: 0,
            paddingBlockPageContainerContent: 0,
          },
        }}
      >
        <Suspense
          fallback={
            <div className="flex justify-center p-4">
              <Spin />
            </div>
          }
        >
          <Outlet />
        </Suspense>
        {context}
      </ProLayout>
    </div>
  );
};

export default PageLayout;
