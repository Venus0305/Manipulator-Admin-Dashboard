import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateFormat } from 'utils/constants';

import type { DatePickerViewModeType } from './DatePickerViewMode';

const DATE_FOMART_TYPE = DateFormat.YEAR_MONTH;

const DatePickerByMonth: React.FC<DatePickerViewModeType> = ({ onChange }) => {
  const { t } = useTranslation();

  const TODAY_DATE = dayjs();

  const [currentDate, setCurrentDate] = useState<string>(TODAY_DATE.format(DATE_FOMART_TYPE));
  const IS_THIS_DAY = TODAY_DATE.format(DATE_FOMART_TYPE) === currentDate;

  const changeCurrentDate = (dateString: string) => {
    setCurrentDate(dateString);

    onChange([
      dayjs(dateString).startOf('month').format(DateFormat.YEAR_MONTH_DATE),
      dayjs(dateString).endOf('month').format(DateFormat.YEAR_MONTH_DATE),
    ]);
  };

  return (
    <Space>
      <Button
        onClick={() =>
          changeCurrentDate(dayjs(currentDate).subtract(1, 'month').format(DATE_FOMART_TYPE))
        }
        icon={<LeftOutlined />}
      >
        {t('actionButton:prev')}
      </Button>
      <DatePicker
        onChange={(e) => changeCurrentDate(e?.format(DATE_FOMART_TYPE) || '')}
        value={dayjs(currentDate)}
        picker="month"
        className="w-[120px]"
        format={DATE_FOMART_TYPE}
        allowClear={false}
      />
      <Button
        disabled={IS_THIS_DAY}
        onClick={() =>
          changeCurrentDate(dayjs(currentDate).add(1, 'month').format(DATE_FOMART_TYPE))
        }
      >
        {t('actionButton:next')} <RightOutlined />
      </Button>
      <Button
        onClick={() => changeCurrentDate(TODAY_DATE.format(DATE_FOMART_TYPE))}
        className="select-current-date-btn"
        disabled={IS_THIS_DAY}
      >
        {t('actionButton:showThisMonth')}
      </Button>
    </Space>
  );
};

export default DatePickerByMonth;
