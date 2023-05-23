import type { FormItemProps } from 'antd';
import { DatePicker, Form } from 'antd';
import type { InputProps } from 'antd/lib/input';
import { useId } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';

const { RangePicker } = DatePicker;

export interface TextInputProps<TFormValues extends FieldValues> extends InputProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  helperText?: string;
}

const DateRange = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  maxLength,
  helperText,
}: TextInputProps<TFormValues>) => {
  const id = useId();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Form.Item
      className={className}
      colon={false}
      help={
        <HelperText
          error={error?.message}
          helperText={helperText}
          maxLength={maxLength}
          value={field.value}
        />
      }
      htmlFor={id}
      label={label}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <RangePicker id={id} {...field} ref={field.ref} value={field.value} />
    </Form.Item>
  );
};

export default DateRange;
