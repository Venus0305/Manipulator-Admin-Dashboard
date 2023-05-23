import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import type { RadioChangeEvent } from 'antd';
import { Button, Radio, Row } from 'antd';
import CustomTable from 'components/CustomTable';
import TextInput from 'components/Form/TextInput';
import DatePickerViewMode from 'components/RadioGroupDatePicker';
import SearchWrapper, { defaultSchema } from 'components/SearchWrapper';
import dayjs from 'dayjs';
import useList from 'hooks/useList';
import useSearch from 'hooks/useSearch';
import salesQuery from 'models/sales';
import type { ISalesItem, VIEW_MODE } from 'models/sales/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DateFormat, viewDatePickerOptions } from 'utils/constants';

import schema from './searchSchema';

const SalesList = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<VIEW_MODE>('CUSTOM');

  const viewDatePickerOptionsFormat = viewDatePickerOptions.map((item) => ({
    ...item,
    label: t(`dateViewMode:${item.label}`),
  }));

  const {
    list: data,
    isFetching,
    pagination,
  } = useList<ISalesItem, { totalSaleAmount: number }>(salesQuery.salesList);
  const salesList = data.map((item, index) => ({ ...item, key: `sales-item-item-${index}` }));
  const [keyword, setKeyword] = useState('');

  const { query, setQuery } = useSearch({ schema });
  const defaultQueryParams = defaultSchema.cast(query);

  const onDateChange = (dates: string[]) => {
    let submitQuery = {
      order: defaultQueryParams.order,
      orderBy: defaultQueryParams.orderBy,
      limit: defaultQueryParams.limit,
      page: 1,
      keyword,
    };

    if (dates.length > 1) {
      submitQuery = { ...submitQuery, ...{ from: dates[0], to: dates[1] } };
    }
    setQuery(submitQuery);
  };

  const columns: ProColumns<ISalesItem>[] = [
    {
      dataIndex: 'transactionId',
      title: t('sales:id'),
    },
    {
      dataIndex: 'transactionDate',
      title: t('sales:transactionDate'),
      renderText: (value: string) =>
        value ? dayjs(value).format(DateFormat.YEAR_MONTH_DATE_HOUR_DASH) : '',
    },
    {
      dataIndex: 'salonName',
      title: t('sales:salonName'),
      render: (_, data) => (
        <Link to={`/salon/${data.salonId}/profile`}>
          <div className="cursor-pointer">{data.salonName}</div>
        </Link>
      ),
    },
    {
      dataIndex: 'manipulatorName',
      title: t('sales:manipulatorName'),
    },
    {
      dataIndex: 'menuName',
      title: t('sales:menus'),
    },
    {
      dataIndex: 'saleAmount',
      title: t('sales:salesAmount'),
    },
  ];

  const handleChangeRequestStatus = (e: RadioChangeEvent) => {
    setViewMode(e.target.value);
    const submitQuery = {
      order: defaultQueryParams.order,
      orderBy: defaultQueryParams.orderBy,
      limit: defaultQueryParams.limit,
      page: 1,
      keyword,
    };

    setQuery(submitQuery);
  };

  return (
    <PageContainer className="bg-[#f0f2f5] p-0" header={{ title: '' }}>
      <div className="page-title">{t('sideMenu:sales')}</div>
      <div className="flex flex-col m-6 gap-2">
        <div className="bg-white py-2 flex justify-center rounded">
          <ProCard className="date-picker-view-wrapper">
            <Row justify="center">
              <Radio.Group
                options={viewDatePickerOptionsFormat}
                onChange={handleChangeRequestStatus}
                value={viewMode || ''}
                optionType="button"
              />
            </Row>
            <Row justify="center">
              <DatePickerViewMode viewMode={viewMode} onChange={onDateChange} />
            </Row>
          </ProCard>
        </div>

        <div className="flex flex-col gap-2 p-4 pt-6 bg-white rounded">
          <SearchWrapper
            layout="vertical"
            schema={schema}
            transform={(values) => {
              setKeyword(values.keyword || '');
              return values;
            }}
          >
            {({ control }) => (
              <div className="flex gap-4  items-start w-full">
                <TextInput allowClear className="w-72 mb-0" control={control} name="keyword" />
                <Button form="search-form" htmlType="submit" type="primary">
                  {t('global:search')}
                </Button>
              </div>
            )}
          </SearchWrapper>
          <CustomTable
            columns={columns}
            dataSource={salesList}
            loading={isFetching}
            pagination={pagination}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default SalesList;
