import type { Mutation } from '@tanstack/react-query';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { t } from 'i18n';
import { router } from 'router';
import Helper from 'utils/helpers';

import type { IError } from './types';

const handleError = (
  error: IError,
  _: unknown,
  __?: unknown,
  mutation?: Mutation<unknown, unknown, unknown, unknown>,
) => {
  let errorMessage = typeof error.error === 'string' ? error.error : '';
  const errorCode = error.code;
  if (Array.isArray(error.error)) {
    const constraints = error.error[0]?.constraints;
    if (constraints && typeof constraints === 'object' && Object.keys(constraints).length > 0) {
      const firstConstraintError = Object.values(constraints)[0];
      if (firstConstraintError) {
        errorMessage = firstConstraintError;
      }
    }
  }
  if (errorMessage === 'Network Error') {
    errorMessage = t('global.networkError');
  }
  if (mutation && mutation.meta) {
    const { notToastErrorCodes }: { notToastErrorCodes?: (number | string)[] } = mutation.meta;
    if (notToastErrorCodes && notToastErrorCodes.includes(errorCode)) {
      return;
    }
  }
  if (errorCode === 401) {
    return;
  }
  if (errorCode === 406) {
    const queryClient = new QueryClient();
    Helper.removeWebCookie();
    queryClient
      .getQueryCache()
      .findAll(['currentUser'])
      .forEach((query) => query.reset());
    router.navigate('/login');
  } else {
    notification.error({ message: errorMessage, key: errorMessage });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: true,
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
  mutationCache: new MutationCache({
    onError: (error, query) => handleError(error as IError, query),
  }),
  queryCache: new QueryCache({
    onError: (error, query) => handleError(error as IError, query),
  }),
});

export default queryClient;
