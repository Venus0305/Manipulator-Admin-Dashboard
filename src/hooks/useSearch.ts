import qs from 'query-string';
import type { DeepPartial } from 'react-hook-form';
import type { NavigateOptions } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import type { AnyObject, ObjectSchema } from 'yup';

export type SearchOptions<TData extends AnyObject> = {
  schema?: ObjectSchema<TData>;
  defaultValues?: DeepPartial<TData>;
};
const useSearch = <TData extends AnyObject>(options?: SearchOptions<TData>) => {
  const { search, pathname } = useLocation();
  const { schema, defaultValues } = options || {};
  const navigate = useNavigate();
  const query = qs.parse(search, { parseBooleans: true, arrayFormat: 'bracket' });
  // TODO: Not using `as`
  const combineQuery = { ...query, ...(defaultValues || {}) };
  const parsedQuery = (schema ? schema.cast(combineQuery) : combineQuery) as TData;

  const setQuery = (params: Record<string, any>, navigateOptions?: NavigateOptions) => {
    navigate({
      pathname,
      search: qs.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: 'bracket',
      }),
      ...navigateOptions,
    });
  };
  return { query: parsedQuery, setQuery };
};

export default useSearch;
