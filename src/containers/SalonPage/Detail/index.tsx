import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Col, Descriptions, Row, Skeleton, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from 'hooks';
import _get from 'lodash/get';
import salonQuery from 'models/salon';
import type { ISalonDetailItem } from 'models/salon/types';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { BADGE_COLOR, DateFormat } from 'utils/constants';

const { Text } = Typography;

const SalonDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data, isFetching } = useFetch<ISalonDetailItem>(salonQuery.detail(id as string));

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabList = [
    {
      key: 'profile',
      tab: t('common:profile'),
      className: 'mb-0',
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/salon/${id}/${key}`, { replace: true });
  };

  const content = (
    <Row className="p-4 page-header-container" gutter={16} wrap={false}>
      <Col flex="auto">
        <Descriptions column={3} layout="vertical">
          <Descriptions.Item label={<Text type="secondary">{t('salon:nameKana')}</Text>} span={1}>
            <Skeleton loading={isFetching}>
              <Text>{_get(data, 'nameKana')}</Text>
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label={<Text type="secondary">{t('common:status')}</Text>} span={1}>
            <Skeleton loading={isFetching}>
              <Badge
                color={BADGE_COLOR.SALON_ACCOUNT_STAUS[data?.status || 'VALID']?.color}
                text={t(BADGE_COLOR.SALON_ACCOUNT_STAUS[data?.status || 'VALID']?.text)}
              />
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label={<Text type="secondary">{t('common:lastLogin')}</Text>} span={1}>
            <Skeleton loading={isFetching}>
              <Text>{dayjs(_get(data, 'lastLogin')).format(DateFormat.YEAR_MONTH_DATE_DASH)}</Text>
            </Skeleton>
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );

  return (
    <PageContainer
      className="bg-white mx-0"
      content={content}
      header={{
        title: <div>{_get(data, 'name')}</div>,
        breadcrumb: {
          items: [
            {
              title: t('salon:name'),
            },
            {
              title: _get(data, 'name') as string,
            },
          ],
          className: 'p-4',
        },
        onBack: () => {
          navigate(-1);
        },
      }}
      onTabChange={handleTabChange}
      tabActiveKey={pathname.split(`/`).pop()}
      tabList={tabList}
      tabProps={{
        className: 'pl-4',
      }}
    >
      <Outlet />
    </PageContainer>
  );
};

export default SalonDetail;
