import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { TablePaginationConfig } from 'antd';
import type { IListResult } from 'hooks/types';
import api from 'utils/api';

import { useAuth } from './useAuth';
import useSearch from './useSearch';

interface Options<TQueryFnData = unknown>
  extends Omit<
    UseQueryOptions<unknown, unknown, IListResult<TQueryFnData>, unknown[]>,
    'queryFn' | 'queryKey'
  > {
  customParams?: Record<string, unknown>;
  queryKey: unknown[];
  apiUrl: string;
  omitKeys?: string[];
  transform?: (params: Record<string, unknown>) => Record<string, unknown>;
}

const useList = <TQueryFnData = unknown, TQueryCustomData = unknown>(
  options: Options<TQueryFnData>,
): {
  list: TQueryFnData[];
  total: number;
  page: number;
  perPage: number;
  isFetching: boolean;
  isLoading: boolean;
  lastPage: number;
  refetch: () => Promise<unknown>;
  pagination: TablePaginationConfig;
  customData: TQueryCustomData;
} => {
  const { queryKey, apiUrl, customParams, omitKeys, transform, ...otherOptions } = options;
  const { query: searchParams } = useSearch();

  const { setAccessToken: setRefreshToken } = useAuth();

  const params = {
    ...searchParams,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: searchParams.limit ? Number(searchParams.limit) : 10,
    ...customParams, // Do not change the order. Please pass another param if you want to override the params
  };

  const formatParams = (_params: Record<string, unknown>) => {
    const formattedParams = { ..._params };
    if (omitKeys) {
      omitKeys.forEach((key) => {
        delete formattedParams[key];
      });
    }
    if (transform) {
      return transform(formattedParams);
    }
    return formattedParams;
  };

  const formattedParams = formatParams(params);
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [...queryKey, formattedParams],
    queryFn: async () => {
      await setRefreshToken();
      const { data: result }: { data: IListResult<TQueryFnData> } = await api.get(apiUrl, {
        params: formattedParams,
      });
      return result;
    },
    ...otherOptions,
  });

  return {
    list: data?.docs || [],
    total: data?.totalDocs || 0,
    lastPage: data?.totalPages || 0,
    page: data?.page || 1,
    perPage: data?.limit || 10,
    isLoading,
    isFetching,
    refetch,
    pagination: {
      showSizeChanger: true,
      pageSize: Number(data?.limit || 10),
      current: Number(data?.page || 1),
      total: data?.totalDocs || 0,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
    },
    customData: data as TQueryCustomData,
  };
};
export default useList;
