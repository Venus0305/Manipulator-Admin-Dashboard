import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker } from 'antd';
import CustomTable from 'components/CustomTable';
import TextInput from 'components/Form/TextInput';
import SearchWrapper from 'components/SearchWrapper';
import dayjs from 'dayjs';
import useList from 'hooks/useList';
import salonQuery from 'models/salon';
import type { ISalonItem } from 'models/salon/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DateFormat } from 'utils/constants';

import schema from './searchSchema';

const { RangePicker } = DatePicker;

const SalonList = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<string[]>([]);

  const { list: data, isFetching, pagination } = useList<ISalonItem>(salonQuery.salonList);

  const columns: ProColumns<ISalonItem>[] = [
    {
      dataIndex: 'id',
      title: t('salon:id'),
    },
    {
      dataIndex: 'name',
      title: t('salon:name'),
    },
    {
      dataIndex: 'nameKana',
      title: t('salon:nameKana'),
    },
    {
      dataIndex: 'email',
      title: t('salon:email'),
    },
    {
      dataIndex: 'phone',
      title: t('salon:phone'),
    },
    {
      dataIndex: 'createdAt',
      title: t('salon:registerDate'),
      renderText: (value: string) => dayjs(value).format(DateFormat.YEAR_MONTH_DATE),
    },
    {
      dataIndex: 'status',
      title: t('common:status'),
      filters: true,
      valueEnum: {
        VALID: { text: 'Valid', status: 'Success' },
        INVALID: { text: 'Invalid', status: 'Error' },
        AWAITING: { text: 'Awaiting Review', status: 'Error' },
      },
    },
    {
      key: 'action',
      render: (_, data) => (
        <div className="flex gap-2">
          <Link to={`/salon/${data.id}/profile`}>
            <div className="text-[#189dff] cursor-pointer">{t('global:detail')}</div>
          </Link>
        </div>
      ),
    },
  ];

  function onChange(_: any, dateStrings: string[]) {
    setDateRange(dateStrings);
  }

  const salonDataList = data.map((item, index) => ({ ...item, key: `salon-detail-item-${index}` }));

  return (
    <PageContainer className="bg-[#f0f2f5] p-0" header={{ title: '' }}>
      <div className="page-title">{t('sideMenu:customer')}</div>
      <div className="flex flex-col gap-2 m-6 p-4 pt-6 bg-white rounded">
        <SearchWrapper
          layout="vertical"
          schema={schema}
          transform={(values, _) => {
            if (dateRange[0] !== '') {
              return { ...values, from: dateRange[0], to: dateRange[1] };
            }

            const payload = { ...values };
            delete payload.from;
            delete payload.to;
            return payload;
          }}
        >
          {({ control }) => (
            <div className="flex gap-4  items-start w-full">
              <TextInput allowClear className="w-72 mb-0" control={control} name="keyword" />
              <RangePicker onChange={onChange} />

              <Button form="search-form" htmlType="submit" type="primary">
                {t('global:search')}
              </Button>
            </div>
          )}
        </SearchWrapper>
        <CustomTable
          key="salon-list"
          columns={columns}
          dataSource={salonDataList}
          loading={isFetching}
          pagination={pagination}
        />
      </div>
    </PageContainer>
  );
};

export default SalonList;
