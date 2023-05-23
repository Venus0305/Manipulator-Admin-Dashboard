import type { VIEW_MODE } from 'models/sales/types';
import React from 'react';

import DatePickerByCustom from './DatePickerByCustom';
import DatePickerByDay from './DatePickerByDay';
import DatePickerByMonth from './DatePickerByMonth';
import DatePickerByWeek from './DatePickerByWeek';

interface DatePickerViewModeType {
  viewMode: VIEW_MODE;
  onChange: (dateRange: string[]) => void;
}

const RadioGroupDatePicker: React.FC<DatePickerViewModeType> = ({ viewMode, onChange }) => {
  const renderViewMode = () => {
    switch (viewMode) {
      case 'DAY':
        return <DatePickerByDay onChange={onChange} />;
      case 'WEEK':
        return <DatePickerByWeek onChange={onChange} />;
      case 'MONTH':
        return <DatePickerByMonth onChange={onChange} />;
      case 'CUSTOM':
        return <DatePickerByCustom onChange={onChange} />;
      default:
        return <DatePickerByDay onChange={onChange} />;
    }
  };

  return <div className="date-picker-view-mode-wrapper">{renderViewMode()}</div>;
};

export default RadioGroupDatePicker;
