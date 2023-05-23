import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import CustomTable from 'components/CustomTable';
import useList from 'hooks/useList';
import manipulatorQuery from 'models/manipulator';
import type { IManipulatorItem } from 'models/manipulator/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ManipulatorList = () => {
  const { t } = useTranslation();

  const {
    list: data,
    isFetching,
    pagination,
  } = useList<IManipulatorItem>(manipulatorQuery.manipulatorList);

  const manipulatorList = data.map((item, index) => ({
    ...item,
    key: `manipulator-item-${index}`,
  }));

  const columns: ProColumns<IManipulatorItem>[] = [
    {
      dataIndex: 'name',
      title: t('manipulator:name'),
    },
    {
      dataIndex: 'nameKana',
      title: t('manipulator:nameKana'),
    },
    {
      dataIndex: 'email',
      title: t('manipulator:email'),
      sorter: true,
    },

    {
      dataIndex: 'status',
      title: t('manipulator:status'),
      valueEnum: {
        ACTIVE: { text: 'ACTIVE', status: 'Success' },
        DEACTIVE: { text: 'DEACTIVE', status: 'Error' },
      },
    },
    {
      key: 'action',
      render: (_, data) => (
        <div className="flex gap-2">
          <Link to={`/manipulator/${data._id}/profile`}>
            <div className="text-[#189dff] cursor-pointer">{t('global:detail')}</div>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <PageContainer className="bg-[#f0f2f5] p-0" header={{ title: '' }}>
      <div className="page-title">{t('sideMenu:manipulator')}</div>
      <CustomTable
        className="m-3 p-3"
        columns={columns}
        dataSource={manipulatorList}
        loading={isFetching}
        pagination={pagination}
      />
    </PageContainer>
  );
};

export default ManipulatorList;
