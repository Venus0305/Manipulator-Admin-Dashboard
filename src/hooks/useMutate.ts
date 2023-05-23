import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';
import api from 'utils/api';

import { useAuth } from './useAuth';

interface Options<TData, TVariables, TError>
  extends Omit<UseMutationOptions<TVariables, TError, TData>, 'mutationFn'> {
  apiUrl: string | ((params: TData) => string);
  method?: string;
  defaultToast?: boolean;
  successMessage?: string;
  axiosConfig?: AxiosRequestConfig;
}

const useMutate = <TData = unknown, TVariables = unknown, TError = unknown>(
  options: Options<TData, TVariables, TError>,
) => {
  const { t } = useTranslation();
  const {
    apiUrl,
    defaultToast,
    method = 'post',
    successMessage,
    axiosConfig,
    ...otherOptions
  } = options;
  const { setAccessToken: setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: async (params: TData) => {
      const url = typeof apiUrl === 'string' ? apiUrl : apiUrl(params);
      await setRefreshToken();

      switch (method) {
        case 'put': {
          const { data } = await api.put(url, params, axiosConfig);
          return data;
        }
        case 'delete': {
          const { data } = await api.delete(url, axiosConfig);
          return data;
        }
        case 'patch': {
          const { data } = await api.patch(url, params, axiosConfig);
          return data;
        }
        case 'get': {
          const { data } = await api.get(url, {
            params,
          });
          return data;
        }
        default: {
          const { data } = await api.post(url, params, axiosConfig);
          return data;
        }
      }
    },
    onSuccess: () => {
      if (defaultToast || successMessage) {
        notification.success({ message: successMessage || t('validation:completed') });
      }
    },
    ...otherOptions,
  });
};

export default useMutate;
