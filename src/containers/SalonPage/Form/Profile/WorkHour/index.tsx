import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, notification, Space, TimePicker, Typography } from 'antd';
import type { SalonEditContextType } from 'containers/SalonPage/Edit';
import dayjs from 'dayjs';
import { useMutate } from 'hooks';
import salonQuery from 'models/salon';
import type { IBusinessHours } from 'models/salon/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

const { Text } = Typography;

const SalonProfileWorkHourForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isFetching, data } = useOutletContext<SalonEditContextType>();
  const { id } = useParams();

  const [currentBusinessHours, setCurrentBusinessHours] = useState<IBusinessHours[]>([
    ...data.businessHours,
  ]);

  const { mutateAsync: updateSalon, isLoading: isUpdating } = useMutate<{
    businessHours: IBusinessHours[];
  }>(salonQuery.update(id));

  const onSubmit = () => {
    updateSalon(
      { businessHours: currentBusinessHours },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (e) => {
          console.log(e);
        },
      },
    );
  };

  const addBusinessHour = (weekIndex: number) => {
    const updatedBusinessHours = [...currentBusinessHours];
    const currentItem = updatedBusinessHours[weekIndex];
    if (currentItem) {
      const firstEndTIme = currentItem.hours[0]?.endTime || '14:00';
      const startTime = dayjs(firstEndTIme, 'HH:mm').add(1, 'hours').format('HH:mm');
      let endTime = dayjs(firstEndTIme, 'HH:mm').add(3, 'hours').format('HH:mm');
      if (dayjs(startTime, 'H:mm').isAfter(dayjs(endTime, 'H:mm'))) endTime = '23:59';

      currentItem.hours.push({ startTime, endTime });
      setCurrentBusinessHours(updatedBusinessHours);
    }
  };

  const changeBusinessHour = (
    [startTime, endTime]: string[],
    weekIndex: number,
    hourIndex: number,
  ) => {
    const isAfter30Min = dayjs(endTime, 'HH:mm').isAfter(
      dayjs(startTime, 'HH:mm').add(30, 'minute'),
    );

    if (isAfter30Min) {
      if (hourIndex === 1) {
        const firstEndTime = currentBusinessHours[weekIndex]?.hours[0]?.endTime || '00:00';
        const isBefore = dayjs(firstEndTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm'));
        if (!isBefore) {
          notification.warning({ message: t('global:timeisBefore') });
          return;
        }
      }
      const updatedBusinessHours = [...currentBusinessHours];
      const currentItem = updatedBusinessHours[weekIndex];
      if (currentItem && startTime && endTime) {
        currentItem.hours[hourIndex] = {
          startTime,
          endTime,
        };
        setCurrentBusinessHours(updatedBusinessHours);
      }
    } else {
      notification.warning({ message: t('global:timeDiff') });
    }
  };

  const changeHolidayStatus = (weekIndex: number) => {
    const updatedBusinessHours = [...currentBusinessHours];
    const currentItem = updatedBusinessHours[weekIndex];
    if (currentItem) {
      currentItem.isHoliday = !currentItem.isHoliday;
      setCurrentBusinessHours(updatedBusinessHours);
    }
  };

  const removeHourItem = (weekIndex: number, hourIndex: number) => {
    const updatedBusinessHours = [...currentBusinessHours];
    const currentItem = updatedBusinessHours[weekIndex];
    if (currentItem) {
      currentItem.hours.splice(hourIndex, 1);
      setCurrentBusinessHours(updatedBusinessHours);
    }
  };

  return (
    <div className="bg-white w-full rounded p-6  gap-4">
      <Space className="w-full" direction="vertical">
        {currentBusinessHours.map((item, weekIndex) => (
          <Space
            className="py-3 w-full"
            direction="vertical"
            key={`work-busness-item-${weekIndex}`}
          >
            <Text className="text-[#00000073]">{t(`salon:workHour:${item.weekDay}`)}:</Text>
            <Space className="w-full" align="start" size={45}>
              <Space
                className={`w-full ${
                  item.isHoliday && 'opacity-60 pointer-events-none cursor-not-allowed '
                }`}
                style={{ opacity: item.isHoliday ? 0.6 : 1 }}
                direction="vertical"
              >
                {item.hours.map((hours, hourIndex) => (
                  <Col
                    key={`work-busness-time-${weekIndex}-${hourIndex}`}
                    span={24}
                    className="flex gap-3"
                  >
                    <TimePicker.RangePicker
                      value={[dayjs(hours.startTime, 'HH:mm'), dayjs(hours.endTime, 'HH:mm')]}
                      allowClear={false}
                      format={'HH:mm'}
                      className="max-w-[180px]"
                      onChange={(_, fomartString) =>
                        changeBusinessHour(fomartString, weekIndex, hourIndex)
                      }
                    />
                    <CloseCircleOutlined
                      className="opacity-60 cursor-pointer hover:opacity-90"
                      onClick={() => removeHourItem(weekIndex, hourIndex)}
                    />
                  </Col>
                ))}
                {item.hours.length < 2 && (
                  <Button
                    key={`work-busness-time-addbtn-${weekIndex}`}
                    size="middle"
                    onClick={() => {
                      addBusinessHour(weekIndex);
                    }}
                  >
                    + {t('global:add')}
                  </Button>
                )}
              </Space>

              <Col>
                <Checkbox
                  checked={item.isHoliday}
                  onChange={() => {
                    changeHolidayStatus(weekIndex);
                  }}
                >
                  {t('salon:workHour:holiday')}
                </Checkbox>
              </Col>
            </Space>
          </Space>
        ))}
      </Space>
      <div className="flex justify-center mt-8">
        <Button
          className="w-full max-w-xs  "
          htmlType="submit"
          loading={isFetching || isUpdating}
          size="large"
          type="primary"
          onClick={onSubmit}
        >
          {t('global:update')}
        </Button>
      </div>
    </div>
  );
};

export default SalonProfileWorkHourForm;
