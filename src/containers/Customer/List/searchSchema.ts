import { object, string } from 'yup';

const schema = object({
  keyword: string().trim().default(''),
  from: string(),
  to: string(),
});

export default schema;
