import type { FormItemProps } from 'antd';
import { Form, Input } from 'antd';
import type { InputProps } from 'antd/lib/input';
import { useId } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { PatternFormatProps } from 'react-number-format';
import { PatternFormat } from 'react-number-format';

import HelperText from '../HelperText';

export interface MaskedInputProps<TFormValues extends FieldValues>
  extends Omit<PatternFormatProps, 'size'>,
    Omit<InputProps, 'defaultValue' | 'value' | 'type' | 'prefix'> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  className?: string;
  formItemProps?: FormItemProps;
  required?: boolean;
  helperText?: string;
  keepFormatted?: boolean;
}

const MaskedInput = <TFormValues extends FieldValues>({
  label,
  className = '',
  control,
  name,
  formItemProps,
  required,
  helperText,
  maxLength,
  keepFormatted,
  ...props
}: MaskedInputProps<TFormValues>) => {
  const id = useId();
  const {
    field: { ref, onChange, ...otherField },
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
          value={otherField.value}
        />
      }
      htmlFor={id}
      label={label}
      required={required}
      validateStatus={error ? 'error' : 'success'}
      {...formItemProps}
    >
      <PatternFormat
        {...props}
        {...otherField}
        customInput={Input}
        getInputRef={ref}
        id={id}
        onValueChange={(values) => {
          if (keepFormatted) {
            onChange(values.formattedValue);
          } else onChange(values.value);
        }}
      />
    </Form.Item>
  );
};

export default MaskedInput;
