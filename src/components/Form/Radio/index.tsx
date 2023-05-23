import type { FormItemProps, RadioProps } from 'antd';
import { Form, Radio } from 'antd';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export interface RadioFieldProps<TFormValues extends FieldValues> extends RadioProps {
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
}

const RadioField = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  data = [],
  ...props
}: RadioFieldProps<TFormValues>) => {
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
      help={error?.message}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <Radio.Group onChange={field.onChange} value={field.value} {...props}>
        {data.map((item) => (
          <Radio key={item._id} value={item._id}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioField;
