import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import api from 'utils/api';

import { useAuth } from './useAuth';

export interface Options<TQueryFnData = unknown, TData = TQueryFnData>
  extends Omit<UseQueryOptions<TQueryFnData, unknown, TData, QueryKey>, 'queryFn' | 'queryKey'> {
  queryKey: QueryKey;
  apiUrl: string;
  customParams?: Record<string, unknown>;
}

const useDetail = <TQueryFnData = unknown, TData = TQueryFnData>(
  options: Options<TQueryFnData, TData>,
) => {
  const { queryKey, apiUrl, customParams, ...otherOptions } = options;

  const { setAccessToken: setRefreshToken } = useAuth();

  const fetchData = async () => {
    await setRefreshToken();
    const { data } = await api.get(apiUrl, {
      params: customParams,
    });
    return data;
  };

  return useQuery({
    queryKey,
    queryFn: fetchData,
    ...otherOptions,
  });
};

export default useDetail;
