import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import CustomTable from 'components/CustomTable';
import dayjs from 'dayjs';
import useList from 'hooks/useList';
import operatorQuery from 'models/operator';
import type { IOperatorItem } from 'models/operator/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DateFormat } from 'utils/constants';

const OperatorList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { list: data, isFetching, pagination } = useList<IOperatorItem>(operatorQuery.operatorList);

  const operatorList = data.map((item, index) => ({
    ...item,
    key: `operator-item-${index}`,
  }));

  const columns: ProColumns<IOperatorItem>[] = [
    {
      dataIndex: 'id',
      title: t('operator:operatorId'),
    },
    {
      dataIndex: 'lastLogin',
      title: t('operator:lastLoginDate'),
      renderText: (value: string) =>
        value ? dayjs(value).format(DateFormat.YEAR_MONTH_DATE_HOUR_DASH) : '-',
    },
    {
      dataIndex: 'email',
      title: t('operator:email'),
    },
    {
      render: (_, data) => {
        let roleStr = '';
        data.roles.forEach((role) => {
          roleStr += `${role.name},`;
        });

        if (roleStr.length > 0) {
          roleStr = roleStr.substring(0, roleStr.length - 1);
        }

        return roleStr;
      },
      title: t('operator:role'),
    },
  ];
  return (
    <PageContainer className="bg-[#f0f2f5] p-0" header={{ title: '' }}>
      <div className="page-title flex justify-between ">
        <div className="">{t('sideMenu:operator')}</div>

        <Button
          size="middle"
          onClick={() => {
            navigate(`/operator/create`, { replace: true });
          }}
        >
          + {t('global:create')}
        </Button>
      </div>
      <CustomTable
        className="m-3 p-3"
        columns={columns}
        dataSource={operatorList}
        loading={isFetching}
        pagination={pagination}
      />
    </PageContainer>
  );
};

export default OperatorList;
