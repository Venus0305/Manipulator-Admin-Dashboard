import { PageContainer } from '@ant-design/pro-layout';
import { useFetch } from 'hooks';
import _get from 'lodash/get';
import salonQuery from 'models/salon';
import type { ISalonDetailItem } from 'models/salon/types';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';

export type SalonEditContextType = {
  isFetching: boolean;
  data: ISalonDetailItem;
  handleUpdate: <TData>(values: TData, isDirty: boolean) => void;
};

const componentNameArray: Record<string, string> = {
  'basic-info': 'basicInfo',
  'salon-info': 'salonInfo',
  'bank-info': 'bankInfo',
  'work-hour-info': 'workHour',
};

const SalonEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();

  const { data, isFetching } = useFetch<ISalonDetailItem>(salonQuery.detail(id as string));

  const tabName = location.pathname.split('/')[4];
  const componentKey = location.pathname.split('/')[5] as string;

  return (
    <PageContainer
      className="bg-white mx-0"
      header={{
        title: t(`common:${componentNameArray[componentKey]}`),
        breadcrumb: {
          items: [
            {
              title: t('salon:name'),
            },
            {
              title: _get(data, 'name') as string,
            },
            {
              title: t(`common:${tabName}`),
            },
            {
              title: t(`common:${componentNameArray[componentKey]}`),
            },
            {
              title: t('common:edit'),
            },
          ],
          className: 'p-4',
        },
        onBack: () => {
          navigate(-1);
        },
        className: 'pb-5',
      }}
      content={<div className="pb-2"></div>}
    >
      <div className="gap-6 p-4 bg-[#f5f5f5]">
        <Outlet context={{ isFetching, data }} />
      </div>
    </PageContainer>
  );
};

export default SalonEditPage;
