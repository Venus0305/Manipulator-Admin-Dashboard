import ProCard from '@ant-design/pro-card';
import { Badge, Button, Col, Image, Row, Space, Typography } from 'antd';
import CustomDescription from 'components/CustomDescription';
import { useFetch } from 'hooks';
import salonQuery from 'models/salon';
import type { ISalonDetailItem } from 'models/salon/types';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

const { Text } = Typography;

type WorkBusenessProps = {
  readonly data: {
    weekDay: string;
    isHoliday: boolean;
    hours: { startTime: string; endTime: string }[];
  }[];
};

const WorkBusnessComponent: React.FC<WorkBusenessProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Space className="w-full" direction="vertical">
      {data.map((item, index) => (
        <Space className="py-3 w-full" direction="vertical" key={`work-busness-item-${index}`}>
          <Text className="text-[#00000073]">{t(`salon:workHour:${item.weekDay}`)}:</Text>
          {item.isHoliday ? (
            <Text>{t('salon:workHour:holiday')}</Text>
          ) : (
            <Row className="w-full">
              {item.hours.map((hours, i) => (
                <Col key={`work-busness-time-${index}-${i}`} span={12}>
                  <Badge color="#00000060" text={`${hours.startTime} ~ ${hours.endTime}`} />
                </Col>
              ))}
            </Row>
          )}
        </Space>
      ))}
    </Space>
  );
};

const SalonProfile = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useFetch<ISalonDetailItem>({
    ...salonQuery.detail(id as string),
    enabled: false,
  });

  const navigateEditForm = (card: string) => {
    navigate(`/salon/${id}/edit/profile/${card}`);
  };

  return (
    <Row className="gap-6 p-4 bg-[#f5f5f5]">
      <ProCard
        headStyle={{
          fontWeight: 600,
        }}
        headerBordered
        title={t('common:basicInfo')}
        extra={
          <Button className="mb-1" color="primary" onClick={() => navigateEditForm('basic-info')}>
            {t('common:edit')}
          </Button>
        }
      >
        <CustomDescription
          className=" gap-6"
          data={data}
          fields={[
            {
              label: t('salon:name'),
              path: 'name',
            },
            {
              label: t('salon:nameKana'),
              path: 'nameKana',
            },
            {
              label: t('salon:email'),
              path: 'email',
            },
            {
              label: t('salon:phone'),
              path: 'phone',
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
        title={t('salon:salonInfo:salonInfo')}
        extra={
          <Button className="mb-1" color="primary" onClick={() => navigateEditForm('salon-info')}>
            {t('common:edit')}
          </Button>
        }
      >
        <CustomDescription
          className=" gap-6"
          data={data}
          fields={[
            {
              label: t('salon:salonInfo:zipcode'),
              path: 'postalCode',
            },
            {
              label: t('salon:salonInfo:prefecture'),
              render: (record) => record.addresses[0]?.prefectureName,
            },
            {
              label: t('salon:salonInfo:city'),
              render: (record) => record.addresses[0]?.city,
            },
            {
              label: t('salon:salonInfo:address'),
              render: (record) => record.addresses[0]?.address,
            },
            {
              label: t('salon:salonInfo:access'),
              render: (record) => record.access[0],
            },

            {
              label: t('salon:salonInfo:about'),
              path: 'description',
            },
            {
              label: t('salon:salonInfo:attribute'),
              render: (record) => (
                <Space className="gap-2 pt-1" direction="vertical">
                  {record.features.map((tag: { id: number; name: string }, index: number) => (
                    <Badge
                      color="#00000060"
                      key={`salon-attribute-item-${index}`}
                      text={tag.name}
                    />
                  ))}
                </Space>
              ),
            },
            {
              label: t('salon:salonInfo:photo'),
              render: (record) => (
                <Space>
                  {record.photos.map((photo: { url: string }) => (
                    <Image alt="" height={104} key={photo.url} src={photo.url} width={104} />
                  ))}
                </Space>
              ),
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
        title={t('salon:bankInfo:bankInfo')}
        extra={
          <Button className="mb-1" color="primary" onClick={() => navigateEditForm('bank-info')}>
            {t('common:edit')}
          </Button>
        }
      >
        <CustomDescription
          className=" gap-6"
          data={data}
          fields={[
            {
              label: t('salon:bankInfo:bankName'),
              path: 'bankInfo.bankName',
            },
            {
              label: t('salon:bankInfo:accountNumber'),
              path: 'bankInfo.accountNumber',
            },
            {
              label: t('salon:bankInfo:branchName'),
              path: 'bankInfo.branchName',
            },
            {
              label: t('salon:bankInfo:name'),
              path: 'bankInfo.accountName',
            },
            {
              label: t('salon:bankInfo:type'),
              render: (record) => ['Saving', 'Current'][record.bankInfo.transferType],
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
        title={t('salon:workHour:workHour')}
        extra={
          <Button
            className="mb-1"
            color="primary"
            onClick={() => navigateEditForm('work-hour-info')}
          >
            {t('common:edit')}
          </Button>
        }
      >
        {data?.businessHours && <WorkBusnessComponent data={data.businessHours} />}
      </ProCard>
    </Row>
  );
};

export default SalonProfile;
