import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TablePaginationConfig } from 'antd';
import { Empty, Typography } from 'antd';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import useSearch from 'hooks/useSearch';
import { map } from 'lodash';
import type { ReactElement } from 'react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type ParamsType = Record<string, any>;
const { Text } = Typography;

export interface CustomTableProps<TData> extends ProTableProps<TData, ParamsType> {
  addtionalToolbar?: ReactElement;
}
const CustomTable = <TData extends Record<string, any>>({
  columns = [],
  pagination,
  addtionalToolbar,
  ...props
}: CustomTableProps<TData>) => {
  const { t } = useTranslation();
  const { query, setQuery } = useSearch();
  const { order, orderBy } = query;
  const formatColumns: ProColumns<TData>[] = useMemo(() => {
    return columns.map((col) => {
      if (col.key === orderBy) {
        return { ...col, hideInSearch: true, defaultSortOrder: order };
      }
      return { ...col, hideInSearch: true };
    });
  }, [columns, order, orderBy]);

  useEffect(() => {
    if (typeof pagination === 'object') {
      const { total, current, pageSize } = pagination;
      if (
        total &&
        current &&
        pageSize &&
        Math.ceil(total / pageSize) < current &&
        current !== 1 &&
        props.loading === false
      ) {
        setQuery({ ...query, page: 1 });
      }
    }
  }, [pagination, props.loading, query, setQuery]);

  const getFilterQuery = (filters: Record<string, FilterValue | null>) => {
    const filterQuery: any = {};
    map(filters, (values, key) => {
      filterQuery[key] = '';
      if (Array.isArray(values) && values.length > 0) {
        values.forEach((item) => {
          filterQuery[key] += `${item},`;
        });
        filterQuery[key] = filterQuery[key].slice(0, -1);
      }
    });

    return filterQuery;
  };

  const getOrderQuery = (orderObj: SorterResult<TData> | SorterResult<TData>[]) => {
    if (!Array.isArray(orderObj) && orderObj?.order) {
      const orderValue = orderObj.order === 'descend' ? 'desc' : 'asc';
      return `${orderObj.field}.${orderValue}`;
    }

    return null;
  };

  const handleTableChange = (
    params: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<TData> | SorterResult<TData>[],
  ) => {
    setQuery({
      ...query,
      ...getFilterQuery(filter),
      page: params.current,
      limit: params.pageSize,
      sort: getOrderQuery(sorter),
    });
  };
  return (
    <ProTable
      className="[&_.ant-pro-card-body]:p-0 text-md"
      onChange={handleTableChange}
      locale={{
        emptyText: <Empty description={t('global:noData')} image={Empty.PRESENTED_IMAGE_SIMPLE} />,
      }}
      pagination={pagination}
      rowKey="_id"
      scroll={{ x: 'max-content' }}
      search={false}
      toolbar={{
        title: (
          <div className="w-full flex gap-[240px]">
            <Text className="whitespace-nowrap">
              {typeof pagination === 'object' && pagination?.total} Items
            </Text>
            {addtionalToolbar}
          </div>
        ),
      }}
      {...props}
      columns={formatColumns}
      tableClassName={'text-md'}
    />
  );
};

export default CustomTable;
