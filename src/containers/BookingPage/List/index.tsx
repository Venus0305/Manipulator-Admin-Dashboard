import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker } from 'antd';
import CustomTable from 'components/CustomTable';
import TextInput from 'components/Form/TextInput';
import SearchWrapper from 'components/SearchWrapper';
import dayjs from 'dayjs';
import useList from 'hooks/useList';
import bookingQuery from 'models/reservation';
import type { IBookingItem } from 'models/reservation/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DateFormat } from 'utils/constants';
import formatCurrencyJPY from 'utils/number';

import schema from './searchSchema';

const { RangePicker } = DatePicker;

const BookingList = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState<string[]>([]);

  const { list: data, isFetching, pagination } = useList<IBookingItem>(bookingQuery.bookingList);

  const bookingDataList = data.map((item, index) => ({ ...item, key: `booking-item-${index}` }));

  const columns: ProColumns<IBookingItem>[] = [
    {
      dataIndex: '_id',
      title: t('booking:id'),
    },
    {
      dataIndex: 'updatedAt',
      title: t('common:lastUpdated'),
      sorter: true,
      renderText: (value: string) => dayjs(value).format(DateFormat.YEAR_MONTH_DATE_HOUR_DASH),
    },
    {
      dataIndex: 'reservationDate',
      title: t('booking:date'),
      sorter: true,
      renderText: (value: string) => dayjs(value).format(DateFormat.YEAR_MONTH_DATE_HOUR_DASH),
    },
    {
      dataIndex: 'customerName',
      title: t('customer:name'),
    },
    {
      dataIndex: 'salonName',
      title: t('salon:name'),
    },
    {
      dataIndex: 'manipulatorName',
      title: t('common:manipulator'),
    },
    {
      dataIndex: 'originalPrice',
      title: t('common:total'),
      renderText: (value: number) => formatCurrencyJPY(value),
    },
    {
      dataIndex: 'status',
      title: t('common:status'),
      filters: true,
      valueEnum: {
        RESERVED: { text: 'Reserved', status: 'Processing' },
        DONE: { text: 'Done', status: 'Success' },
        CANCELLED: { text: 'Cancelled', status: 'Error' },
      },
    },
    {
      key: 'action',
      render: (_, data) => (
        <div className="flex gap-2">
          <Link to={`/booking/${data._id}`}>
            <div className="text-[#189dff] cursor-pointer">{t('global:detail')}</div>
          </Link>
        </div>
      ),
    },
  ];

  function onChange(_: any, dateStrings: string[]) {
    setDateRange(dateStrings);
  }

  return (
    <PageContainer className="bg-[#f0f2f5] p-0" header={{ title: '' }}>
      <div className="page-title">{t('sideMenu:booking')}</div>
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
          columns={columns}
          dataSource={bookingDataList}
          loading={isFetching}
          pagination={pagination}
        />
      </div>
    </PageContainer>
  );
};

export default BookingList;
