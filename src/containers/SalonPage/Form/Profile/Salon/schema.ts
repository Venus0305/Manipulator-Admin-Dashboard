import type { InferType } from 'yup';
import { array, boolean, mixed, number, object, string } from 'yup';

const schema = object({
  editMode: boolean().default(false),
  postalCode: string().required(),
  prefecture: number().required(),
  city: number().required(),
  address: string().required(),
  access: string().required(),
  features: array().of(number()),
  description: string(),
  photos: array().of(mixed()),
});

export type SalonProfileSalonInfoInputFields = InferType<typeof schema>;
export default schema;
