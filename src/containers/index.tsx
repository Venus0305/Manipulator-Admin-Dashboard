import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, notification } from 'antd';
import en_US from 'antd/locale/en_US';
import ja_JP from 'antd/locale/ja_JP';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import useGlobalState from 'hooks/useGlobalState';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

notification.config({
  placement: 'bottomRight',
  duration: 3,
});

const locales = {
  jp: ja_JP,
  en: en_US,
};

const App = () => {
  const { key } = useLocation();
  const { lng } = useGlobalState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return (
    <ConfigProvider
      autoInsertSpaceInButton={false}
      locale={locales[lng as keyof typeof locales]}
      theme={{
        token: {
          colorPrimary: '#094B0F',
          colorError: '#db5a42',
          colorText: '#333333',
          fontFamily: 'Noto Sans JP,sans-serif',
          fontSize: 16,
          motionDurationSlow: '0.1s',
        },
      }}
    >
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </ConfigProvider>
  );
};

export default App;
