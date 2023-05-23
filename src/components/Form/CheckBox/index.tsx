import type { FormItemProps } from 'antd';
import { Checkbox, Form } from 'antd';
import type { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';

export interface CheckBoxProps<TFormValues extends FieldValues> extends CheckboxGroupProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  data?: Array<CheckboxOptionType | string | number>;
  helperText?: string;
}

const CheckBoxGroup = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  data = [],
  helperText,
  ...props
}: CheckBoxProps<TFormValues>) => {
  const {
    field: { onChange, value, ...otherField },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Form.Item
      className={className}
      colon={false}
      help={<HelperText error={error?.message} helperText={helperText} />}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <Checkbox.Group {...props} {...otherField} options={data} value={value} onChange={onChange} />
    </Form.Item>
  );
};

export default CheckBoxGroup;
