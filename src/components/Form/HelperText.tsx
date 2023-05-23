export interface HelperTextProps {
  maxLength?: number;
  error?: string;
  helperText?: string;
  name?: string;
  value?: string;
}
const HelperText = ({ maxLength, error, helperText, name, value }: HelperTextProps) => {
  if (maxLength || error || helperText) {
    return (
      <div className="flex flex-nowrap	">
        <div
          className="ant-form-item-explain ant-form-item-explain-connected"
          id={`${name}_help`}
          role="alert"
        >
          <div className={error ? 'ant-form-item-explain-error' : 'ant-form-item-explain-success'}>
            {error || helperText}
          </div>
        </div>
        <div style={{ height: 24 }}>{maxLength && `${(value || '').length}/${maxLength}`}</div>
      </div>
    );
  }
  return null;
};

export default HelperText;
