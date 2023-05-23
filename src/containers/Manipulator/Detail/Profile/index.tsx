import ProCard from '@ant-design/pro-card';
import { Row } from 'antd';
import CustomDescription from 'components/CustomDescription';
import dayjs from 'dayjs';
import { useFetch } from 'hooks';
import manipulatorQuery from 'models/manipulator';
import type { IManipulatorDetailItem } from 'models/manipulator/types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { DateFormat } from 'utils/constants';

const ManipulatorProfileInfo = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isFetching } = useFetch<IManipulatorDetailItem>({
    ...manipulatorQuery.detail(id as string),
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
              label: t('manipulator:name'),
              path: 'name',
            },
            {
              label: t('manipulator:nameKana'),
              path: 'nameKana',
            },
            {
              label: t('manipulator:email'),
              path: 'email',
            },
            {
              label: t('manipulator:profile:createdAt'),
              render: (record) => dayjs(record.createdAt).format(DateFormat.YEAR_MONTH_DATE_DASH),
            },
            {
              label: t('manipulator:profile:profile'),
              path: 'profile',
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

export default ManipulatorProfileInfo;
