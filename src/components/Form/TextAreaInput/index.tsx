import type { FormItemProps } from 'antd';
import { Form, Input } from 'antd';
import type { TextAreaProps } from 'antd/lib/input';
import { useId } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';

import HelperText from '../HelperText';

export interface TextAreaInputProps<TFormValues extends FieldValues> extends TextAreaProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  helperText?: string;
}

const TextAreaInput = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  maxLength,
  helperText,
  ...props
}: TextAreaInputProps<TFormValues>) => {
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
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <Input.TextArea
        id={id}
        maxLength={maxLength}
        {...props}
        {...field}
        ref={field.ref}
        value={field.value}
      />
    </Form.Item>
  );
};

export default TextAreaInput;
