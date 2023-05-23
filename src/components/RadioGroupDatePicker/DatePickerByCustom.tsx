import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { DateFormat } from 'utils/constants';

import type { DatePickerViewModeType } from './DatePickerViewMode';

const { RangePicker } = DatePicker;

const DatePickerByCustom: React.FC<DatePickerViewModeType> = ({ onChange }) => {
  const TODAY_DATE = dayjs();
  const handleChange = (_: any, dateStrings: string[]) => {
    if (dateStrings.length > 1 && dateStrings[0]) {
      onChange([...dateStrings]);
    }
  };

  return (
    <Space>
      <RangePicker
        name="searchTime"
        size="middle"
        allowClear={false}
        format={DateFormat.YEAR_MONTH_DATE}
        disabledDate={(current) => {
          return current && current > TODAY_DATE;
        }}
        onChange={handleChange}
      />
    </Space>
  );
};

export default DatePickerByCustom;
