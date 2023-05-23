import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Modal, Row, Select, Space, Steps, Table, Typography } from 'antd';
import CustomDescription from 'components/CustomDescription';
import dayjs from 'dayjs';
import { useFetch, useMutate } from 'hooks';
import _get from 'lodash/get';
import _values from 'lodash/values';
import bookingQuery from 'models/reservation';
import type { IBookingDetailItem } from 'models/reservation/types';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import formatCurrencyJPY from 'utils/number';

import { BOOKING_STATUS, DateFormat } from '../../../utils/constants';

const { Text } = Typography;
const { Step } = Steps;
const { Link: TextLink } = Typography;
const { Option } = Select;

type ServiceInfoProps = {
  readonly data: IBookingDetailItem;
};

const ServiceInfoComponent: React.FC<ServiceInfoProps> = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'serviceName',
      dataIndex: 'serviceName',
      title: <Text strong>{t('common:menuItem')}</Text>,
      width: '25%',
    },
    {
      key: 'duration',
      dataIndex: 'duration',
      title: <Text strong>{t('common:duration')}</Text>,
      width: '25%',
    },
    {
      key: 'amount',
      dataIndex: '',
      width: '25%',
    },
    {
      key: 'totalAmount',
      dataIndex: 'totalAmount',
      title: <Text strong>{t('common:totalAmount')}</Text>,
      width: '25%',
    },
  ];

  const discount = _get(data, 'discountAmount', 0);
  const subtotal = _get(data, 'totalAmount', 0);
  const totalDuration = _get(data, 'estimatedTime', 0);

  const dataSource = [
    {
      key: 1,
      serviceName: _get(data, 'menuName'),
      duration: `${_get(data, 'estimatedTime', 0)} ${t('common:min')}`,
      amount: formatCurrencyJPY(subtotal),
      totalAmount: formatCurrencyJPY(subtotal),
    },
  ];

  const totalColumns = [
    {
      key: 'title',
      dataIndex: 'title',
      width: '10%',
    },
    {
      key: 'duration',
      dataIndex: 'duration',
      width: '20%',
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      width: '20%',
    },
    {
      key: 'totalAmount',
      dataIndex: 'totalAmount',
      width: '20%',
    },
  ];

  const totalDataSource = [
    {
      key: '1',
      title: t('common:subtotal'),
      duration: `${totalDuration} ${t('common:min')}`,
      totalAmount: formatCurrencyJPY(subtotal),
    },
    {
      key: '2',
      title: t('common:discount'),
      totalAmount: formatCurrencyJPY(discount),
    },
    {
      key: '3',
      title: `${t('common:total').toUpperCase()}:`,
      duration: `${totalDuration} ${t('common:min')}`,
      totalAmount: formatCurrencyJPY(subtotal - discount),
    },
  ];

  return (
    <div className="service-info">
      <Table bordered columns={columns} dataSource={dataSource} pagination={false} />
      <Row>
        <Col offset={3} span={21}>
          <Table
            className="service-info-total"
            columns={totalColumns}
            dataSource={totalDataSource}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};

const BookingDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    data,
    isFetching,
    refetch: refetchDetail,
  } = useFetch<IBookingDetailItem>(bookingQuery.detail(id as string));

  const { mutateAsync: changeStatus, isLoading: isUpdating } = useMutate(
    bookingQuery.changeStatus(id),
  );

  const [statusHistoryModalVisible, setStatusHistoryModalVisible] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<number>(3);

  useEffect(() => {
    if (data) {
      switch (data.status) {
        case BOOKING_STATUS.RESERVED.value:
          setCurrentStatus(0);
          break;
        case BOOKING_STATUS.DONE.value:
          setCurrentStatus(1);
          break;
        case BOOKING_STATUS.CANCELLED.value:
          setCurrentStatus(2);
          break;

        default:
          setCurrentStatus(3);
          break;
      }
    }
  }, [data]);

  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    setBookingStatus(data?.status as string);
  }, [data]);

  const handleChangeStatus = (status: string) => {
    const val: any = { action: status };

    changeStatus(val, {
      onSuccess: () => {
        refetchDetail();
      },
    });
  };

  const openChangeBookingStatusModal = (status: string) => {
    const actionStatus: any = {
      DONE: 'complete',
      CANCELLED: 'cancel',
    };
    Modal.confirm({
      title: t('common:confirm'),
      content: t('common:ruSure'),
      onOk() {
        handleChangeStatus(actionStatus[status]);
      },
    });
  };

  return (
    <>
      <PageContainer
        className=" bg-white"
        content={
          <Row align="top" className={'p-4'} justify="space-between">
            <Space direction="vertical">
              <Space>
                <Select
                  disabled={data?.status !== 'RESERVED'}
                  loading={isFetching || isUpdating}
                  onChange={(value) => setBookingStatus(value)}
                  style={{ width: 140 }}
                  value={bookingStatus}
                >
                  {_values(BOOKING_STATUS).map((status, index) => (
                    <Option key={`booking-status-${index}`} value={status.value}>
                      {t(status.text).toUpperCase()}
                    </Option>
                  ))}
                </Select>

                <Button
                  disabled={
                    data?.status !== 'RESERVED' || isUpdating || bookingStatus === data?.status
                  }
                  loading={isFetching}
                  onClick={() => openChangeBookingStatusModal(bookingStatus)}
                  type="primary"
                >
                  {t('common:changeStatus').toUpperCase()}
                </Button>
              </Space>

              <TextLink onClick={() => setStatusHistoryModalVisible(true)} underline>
                {t('common:viewDetails')}
              </TextLink>
            </Space>
          </Row>
        }
        header={{
          breadcrumb: {
            items: [
              {
                title: t('common:bookings'),
              },
            ],
            className: 'p-4',
          },
          title: <>{`${t('booking:id')}#${data?._id}`}</>,
          onBack: () => {
            navigate(-1);
          },
          className: 'p-4',
        }}
      >
        <Row className="p-4 bg-[#f5f5f5]" gutter={[0, 24]}>
          <ProCard
            className="pb-4"
            headStyle={{
              fontWeight: 600,
            }}
            headerBordered
            title={t('booking:info')}
          >
            <CustomDescription
              className="gap-6"
              data={data}
              fields={[
                {
                  label: t('booking:date'),
                  span: 24,
                  render: (record) =>
                    dayjs(record.startTime).format(DateFormat.YYYY_MM_DD_HH_MM_SS_DASH),
                },
                {
                  label: t('common:customer'),
                  span: 8,
                  render: (record) => {
                    const { customerInfo } = record;
                    const customerLink = `/customer/${record.customerId}`;

                    return (
                      <Row gutter={16}>
                        <Col>
                          <Space direction="vertical" size={0}>
                            <Typography.Link underline onClick={() => navigate(customerLink)}>
                              {customerInfo.name}
                            </Typography.Link>
                            <Text>{customerInfo.nameKana}</Text>
                            <Text>{customerInfo.email}</Text>
                            <Text>{customerInfo.phone}</Text>
                          </Space>
                        </Col>
                      </Row>
                    );
                  },
                },
                {
                  label: t('common:manipulator'),
                  span: 8,
                  render: (record) => {
                    const { manipulatorInfo } = record;
                    const manipulatorLink = `/manipulator/${record.manipulatorInfo.manipulatorId}`;

                    return (
                      <Row gutter={16}>
                        <Col>
                          <Space direction="vertical" size={0}>
                            <Typography.Link underline onClick={() => navigate(manipulatorLink)}>
                              {manipulatorInfo.name}
                            </Typography.Link>
                            <Text>{manipulatorInfo.nameKana}</Text>
                            <Text>{manipulatorInfo.email}</Text>
                            <Text>{manipulatorInfo.phone}</Text>
                          </Space>
                        </Col>
                      </Row>
                    );
                  },
                },
                {
                  label: t('salon:name'),
                  span: 8,
                  render: (record) => {
                    const { salonInfo } = record;
                    const salonLink = `/salon/${record.salonInfo.salonId}`;

                    return (
                      <Row gutter={16}>
                        <Col>
                          <Space direction="vertical" size={0}>
                            <Typography.Link underline onClick={() => navigate(salonLink)}>
                              {salonInfo.name}
                            </Typography.Link>
                            <Text>{salonInfo.nameKana}</Text>
                            <Text>{salonInfo.email}</Text>
                            <Text>{salonInfo.phone}</Text>
                          </Space>
                        </Col>
                      </Row>
                    );
                  },
                },
              ]}
              itemContentStyle={{ marginBottom: 24 }}
              layout={'vertical'}
              loading={isFetching}
            />
            {data && <ServiceInfoComponent data={data} />}
          </ProCard>

          {data?.status === BOOKING_STATUS.DONE.value &&
            data?.paymentInfo?.status === 'SETTLED' && (
              <Col span={24}>
                <ProCard
                  headStyle={{
                    fontWeight: 600,
                  }}
                  headerBordered
                  title={t('payment:info')}
                >
                  <CustomDescription
                    className="gap-6"
                    data={data}
                    fields={[
                      {
                        label: t('payment:type'),
                        path: 'paymentInfo.paymentMethodType',
                      },
                      {
                        label: t('payment:ID'),
                        path: 'paymentInfo.transactionId',
                      },
                      {
                        label: t('payment:totalChargedToCard'),
                        path: 'paymentInfo.amount',
                        render: (record) => formatCurrencyJPY(record.paymentInfo.amount as number),
                      },
                      {
                        label: t('payment:cardEndingIn'),
                        path: 'paymentInfo.cardNumber',
                      },

                      {
                        label: t('payment:chargedOn'),
                        render: (record) =>
                          dayjs(record.paymentInfo.paymentDate).format(
                            DateFormat.YYYY_MM_DD_HH_MM_SS_DASH,
                          ),
                      },
                    ]}
                    itemContentStyle={{ marginBottom: 24 }}
                    layout={'vertical'}
                    loading={isFetching}
                  />
                </ProCard>
              </Col>
            )}
        </Row>
      </PageContainer>
      {data && (
        <Modal
          footer={false}
          onCancel={() => setStatusHistoryModalVisible(false)}
          open={statusHistoryModalVisible}
          title={<Text strong>{t('common:statusHistory')}</Text>}
        >
          <Steps current={currentStatus} direction="vertical">
            <Step
              description={
                <Space direction="vertical" size={0}>
                  <Text type="secondary">
                    {dayjs(data.startTime).format(DateFormat.YYYY_MM_DD_HH_MM_SS_DASH)}
                  </Text>
                  <Text type="secondary">{t('booking:statusHistoryRequested')}</Text>
                </Space>
              }
              title={t('booking:reserved')}
            />
            {currentStatus === 1 && (
              <Step
                description={
                  <Space direction="vertical" size={0}>
                    <>
                      <Text type="secondary">
                        {dayjs(data.startTime).format(DateFormat.YYYY_MM_DD_HH_MM_SS_DASH)}
                      </Text>
                      <Text type="secondary">{t('booking:statusHistoryComplete')}</Text>
                    </>
                  </Space>
                }
                status="finish"
                title={t('booking:done')}
              />
            )}
            {currentStatus === 2 && (
              <Step
                description={<Text type="danger">{t('booking:statusHistoryCancel')}</Text>}
                status="error"
                title={t('common:cancel')}
              />
            )}
          </Steps>
        </Modal>
      )}
    </>
  );
};

export default BookingDetail;
