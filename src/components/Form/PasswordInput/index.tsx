import type { FormItemProps } from 'antd';
import { Form, Input } from 'antd';
import type { InputProps } from 'antd/lib/input';
import type { ReactNode } from 'react';
import { useId } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

export interface PasswordInputProps<TFormValues extends FieldValues> extends InputProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  helperText?: ReactNode;
  required?: boolean;
}

const PasswordInput = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  helperText,
  required,
  ...props
}: PasswordInputProps<TFormValues>) => {
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
      help={error?.message || helperText}
      htmlFor={id}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <Input.Password id={id} {...props} {...field} />
    </Form.Item>
  );
};

export default PasswordInput;
