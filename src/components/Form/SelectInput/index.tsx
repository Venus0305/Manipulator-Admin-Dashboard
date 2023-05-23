import type { FormItemProps, SelectProps } from 'antd';
import { Form, Select } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';

const { Option } = Select;

export interface SelectInputProps<TFormValues extends FieldValues> extends SelectProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  data?: {
    _id: string | number;
    name: string | number;
  }[];
  helperText?: string;
  onChange?: () => void;
}

const SelectInput = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  data = [],
  helperText,
  onChange: propsOnChange = () => {},
  ...props
}: SelectInputProps<TFormValues>) => {
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
      <Select
        {...props}
        {...otherField}
        onChange={(selected) => {
          onChange(selected || null);
          propsOnChange();
        }}
        value={value || null}
      >
        {data.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectInput;
