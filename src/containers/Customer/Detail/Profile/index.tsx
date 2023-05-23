import ProCard from '@ant-design/pro-card';
import { Row } from 'antd';
import CustomDescription from 'components/CustomDescription';
import dayjs from 'dayjs';
import { useFetch } from 'hooks';
import customerQuery from 'models/customer';
import type { ICustomerDetailItem } from 'models/customer/types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { DateFormat } from 'utils/constants';

const ProfileInfo = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isFetching } = useFetch<ICustomerDetailItem>({
    ...customerQuery.detail(id as string),
    enabled: false,
  });

  return (
    <Row className="gap-6 p-4 bg-[#f5f5f5]">
      <ProCard
        headStyle={{
          fontWeight: 600,
        }}
        headerBordered
        title={t('common:basicInfo')}
      >
        <CustomDescription
          className=" gap-6"
          data={data}
          fields={[
            {
              label: t('profile:email'),
              path: 'email',
            },
            {
              label: t('profile:phone'),
              path: 'phone',
            },
            {
              label: t('profile:registerDate'),
              render: (record) =>
                dayjs(record.registryDate).format(DateFormat.YEAR_MONTH_DATE_DASH),
            },
          ]}
          itemContentStyle={{ marginBottom: 24 }}
          layout={'vertical'}
          loading={isFetching}
        />
      </ProCard>
      <ProCard
        headStyle={{
          fontWeight: 600,
        }}
        headerBordered
        title={t('customer:cardTitle')}
      >
        <CustomDescription
          className=" gap-6"
          data={data}
          fields={[
            {
              label: t('customer:cardFirstFourNumber'),
              path: 'CardNumber',
            },
            {
              label: t('customer:cardExpire'),
              path: 'CardExpire',
            },
          ]}
          itemContentStyle={{ marginBottom: 24 }}
          layout={'vertical'}
          loading={isFetching}
        />
      </ProCard>
    </Row>
  );
};

export default ProfileInfo;
