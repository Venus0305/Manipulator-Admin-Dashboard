import type { AxiosHeaders } from 'axios';
import axios from 'axios';
import get from 'lodash/get';
import authQuery from 'models/auth';
import { Cookies } from 'react-cookie';

import { MANIPULATOR_ACCESS_TOKEN } from './config';
// eslint-disable-next-line import/no-cycle
import Helper from './helpers';

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

api.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get(MANIPULATOR_ACCESS_TOKEN);

  if (config.headers) {
    if (token && !config.headers.Authorization) {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    (config.headers as AxiosHeaders).set(
      'Accept-Timezone',
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  ({ message, response, config }) => {
    const webCookie = Helper.getWebCookie();
    const originalRequest = config;

    const refreshToken = webCookie?.refreshToken;
    if (response.status === 401 && refreshToken && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api
          .get(authQuery.refreshToken.apiUrl, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          })
          .then(({ data }) => {
            const cookies = new Cookies();
            cookies.set(MANIPULATOR_ACCESS_TOKEN, data.accessToken);

            api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      data: get(response, 'data.data') || get(response, 'data'),
      error: get(response, 'data.error.message') || get(response, 'data.message') || message,
      code: get(response, 'data.code', response?.status || -1),
    });
  },
);

export default api;
