import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import useFetch from 'hooks/useFetch';
import authQuery from 'models/auth';
import type { IAdmin } from 'models/auth/type';
import Helper from 'utils/helpers';

export interface Options<TQueryFnData = unknown, TData = TQueryFnData>
  extends Omit<UseQueryOptions<TQueryFnData, unknown, TData, QueryKey>, 'queryFn' | 'queryKey'> {
  customParams?: Record<string, unknown>;
}

const useUser = <T extends IAdmin>(options?: Options<T>) => {
  const { enabled = true, ...otherOptions } = options || {};

  return useFetch<T>({
    ...authQuery.currentUser,
    enabled: enabled && !!Helper.getWebCookie(),
    staleTime: Infinity,
    ...otherOptions,
  });
};

export default useUser;
