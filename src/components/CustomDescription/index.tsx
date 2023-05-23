import type { DescriptionsProps } from 'antd';
import { Descriptions, Typography } from 'antd';
import Skeleton from 'components/Skeleton';
import TextShowMore from 'components/TextShowMore';
import { get } from 'lodash';
import type { CSSProperties, ReactNode } from 'react';
import type { Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export interface DescriptionFields<T> {
  label: string;
  path?: Path<T>;
  render?: (record: T) => ReactNode;
  span?: number;
  type?: 'paragraph';
}

const CustomDescription = <T extends object>({
  fields = [],
  data,
  layout,
  loading,
  itemContentStyle,
  ...props
}: {
  data?: T;
  fields: DescriptionFields<T>[];
  layout?: 'horizontal' | 'vertical';
  loading?: boolean;
  itemContentStyle?: CSSProperties;
} & DescriptionsProps) => {
  const { t } = useTranslation();

  const renderContent = (record: T, field: DescriptionFields<T>) => {
    if (field.render) {
      return field.render(record) || '---';
    }
    if (field.path) {
      if (field.type === 'paragraph') {
        return <TextShowMore content={(get(record, field.path) as string) || '---'}></TextShowMore>;
      }
      return get(record, field.path as never, '---');
    }
    return null;
  };

  return (
    <Descriptions {...props} colon={false} column={24} layout={layout} size="small">
      {fields.map((field) => (
        <Descriptions.Item
          contentStyle={{ whiteSpace: 'pre-line', ...itemContentStyle }}
          key={field.path || field.label}
          label={field.label ? `${t(field.label)}:` : ''}
          labelStyle={{ color: '#00000073' }}
          span={field.span || 12}
          style={{ paddingBottom: 0 }}
        >
          <Skeleton loading={loading}>
            <Text>{data ? renderContent(data, field) : '---'}</Text>
          </Skeleton>
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default CustomDescription;
