import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import useSearch from 'hooks/useSearch';
import type { ReactNode } from 'react';
import type { DeepPartial, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { AnyObject, InferType, ObjectSchema } from 'yup';
import { mixed, number, object, string } from 'yup';

enum SortOder {
  'descend' = 'descend',
  'ascend' = 'ascend',
}

export const defaultSchema = object({
  page: number(),
  limit: number(),
  order: mixed<SortOder>().oneOf(Object.values(SortOder)),
  orderBy: string(),
});

const SearchWrapper = <TSchema extends AnyObject>({
  formId = 'search-form',
  schema,
  children,
  defaultValues,
  layout,
  className = '',
  transform,
}: {
  formId?: string;
  schema: ObjectSchema<TSchema>;
  children: (form: UseFormReturn<TSchema>) => ReactNode;
  defaultValues?: DeepPartial<TSchema>;
  layout?: FormLayout;
  className?: string;
  transform?: (
    values: TSchema & InferType<typeof defaultSchema>,
    form: UseFormReturn<TSchema>,
  ) => Record<string, unknown>;
}) => {
  const { query, setQuery } = useSearch({ schema, defaultValues });
  const defaultQueryParams = defaultSchema.cast(query);

  const form = useForm<TSchema>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    values: query,
  });

  return (
    <Form
      className={` bg-white ${className}`}
      component="form"
      id={formId}
      layout={layout}
      onFinish={form.handleSubmit((values) => {
        const submitQuery = {
          order: defaultQueryParams.order,
          orderBy: defaultQueryParams.orderBy,
          limit: defaultQueryParams.limit,
          ...values,
          page: 1,
        };
        setQuery(transform ? transform(submitQuery, form) : submitQuery);
      })}
    >
      {children(form)}
    </Form>
  );
};

export default SearchWrapper;
