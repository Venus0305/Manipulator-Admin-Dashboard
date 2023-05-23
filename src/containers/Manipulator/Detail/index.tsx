import { PageContainer } from '@ant-design/pro-layout';
import CustomDescription from 'components/CustomDescription';
import { useFetch } from 'hooks';
import _get from 'lodash/get';
import manipulatorQuery from 'models/manipulator';
import type { IManipulatorDetailItem } from 'models/manipulator/types';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

const ManipulatorDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data, isFetching } = useFetch<IManipulatorDetailItem>(
    manipulatorQuery.detail(id as string),
  );

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
    navigate(`/inquiries/${id}/${key}`, { replace: true });
  };

  return (
    <PageContainer
      className="bg-white"
      content={
        <CustomDescription
          className="px-4"
          data={data}
          fields={[
            {
              label: t('common:name'),
              path: 'name',
              span: 4,
            },
            {
              label: t('common:status'),
              path: 'status',
              span: 4,
            },
          ]}
          layout={'vertical'}
          loading={isFetching}
        />
      }
      header={{
        title: <>{_get(data, 'name')}</>,
        breadcrumb: {
          items: [
            {
              title: t('common:manipulator'),
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

export default ManipulatorDetail;
