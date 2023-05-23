import { PageContainer } from '@ant-design/pro-layout';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import OperatorForm from '../Form';

const OperatorCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer
      className="bg-white mx-0"
      header={{
        title: t(`common:operator`),
        breadcrumb: {
          items: [
            {
              title: t('common:operator'),
            },
            {
              title: t('common:create'),
            },
          ],
          className: 'p-4',
        },
        onBack: () => {
          navigate('/operator');
        },
        className: 'pb-5',
      }}
      content={<div className="pb-2"></div>}
    >
      <div className="gap-6 p-4 bg-[#f5f5f5]">
        <OperatorForm />
      </div>
    </PageContainer>
  );
};

export default OperatorCreate;
