import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateFormat } from 'utils/constants';

import type { DatePickerViewModeType } from './DatePickerViewMode';

const DATE_FOMART_TYPE = DateFormat.YEAR_MONTH_DATE_DASH;

const DatePickerByDay: React.FC<DatePickerViewModeType> = ({ onChange }) => {
  const { t } = useTranslation();
  const TODAY_DATE = dayjs();

  const [currentDate, setCurrentDate] = useState<string>(TODAY_DATE.format(DATE_FOMART_TYPE));

  const IS_THIS_DAY = TODAY_DATE.format(DATE_FOMART_TYPE) === currentDate;

  const changeCurrentDate = (dateString: string) => {
    setCurrentDate(dateString);
    onChange([dayjs(dateString).subtract(1, 'D').format(DATE_FOMART_TYPE), dateString]);
  };

  const renderDateBeforeToday = () => {
    return (
      <Space>
        {Array.from(new Array(3)).map((_, index) => {
          const dayForAfter = dayjs(currentDate).subtract(3 - index, 'day');
          const dayStr = dayForAfter.format('D');
          return (
            <Button
              onClick={() => changeCurrentDate(dayjs(dayForAfter).format(DATE_FOMART_TYPE))}
              key={index}
            >
              {dayStr}
            </Button>
          );
        })}
      </Space>
    );
  };

  const renderDateAfterToday = () => {
    return (
      <Space>
        {Array.from(new Array(3)).map((_, index) => {
          const dayForBefore = dayjs(currentDate).add(index + 1, 'day');

          const dayStr = dayForBefore.format('D');
          const isDisable = TODAY_DATE.isBefore(dayForBefore);

          return (
            <Button
              onClick={() => changeCurrentDate(dayjs(dayForBefore).format(DATE_FOMART_TYPE))}
              key={index}
              disabled={isDisable}
            >
              {dayStr}
            </Button>
          );
        })}
      </Space>
    );
  };

  return (
    <Space>
      <Button
        onClick={() =>
          changeCurrentDate(dayjs(currentDate).subtract(1, 'day').format(DATE_FOMART_TYPE))
        }
        icon={<LeftOutlined />}
      >
        {t('actionButton:prev')}
      </Button>
      {renderDateBeforeToday()}
      <DatePicker
        onChange={(_: any, dateString: string) => {
          changeCurrentDate(dateString);
        }}
        value={dayjs(currentDate)}
        picker="date"
        className="w-[150px]"
        format={DATE_FOMART_TYPE}
        allowClear={false}
      />
      {renderDateAfterToday()}
      <Button
        disabled={IS_THIS_DAY}
        onClick={() => changeCurrentDate(dayjs(currentDate).add(1, 'day').format(DATE_FOMART_TYPE))}
      >
        {t('actionButton:next')} <RightOutlined />
      </Button>
      <Button
        onClick={() => changeCurrentDate(TODAY_DATE.format(DATE_FOMART_TYPE))}
        className="select-current-date-btn"
        disabled={IS_THIS_DAY}
      >
        {t('actionButton:showToday')}
      </Button>
    </Space>
  );
};

export default DatePickerByDay;
