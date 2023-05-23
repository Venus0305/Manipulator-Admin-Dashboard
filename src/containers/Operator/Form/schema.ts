import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';

const schema = object({
  editMode: boolean().default(false),
  email: string().email().required(),
  role: string().required(),
});

export type OperatorInputFields = InferType<typeof schema>;
export default schema;
