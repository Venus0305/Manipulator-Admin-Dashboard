import { t } from 'i18n';
import type { InferType } from 'yup';
import { array, object, string } from 'yup';

const schema = object({
  url: array()
    .of(object({ url: string().required() }))
    .min(1, t('validation:requiredField'))
    .required(),
  alt: string().default(''),
});

export type ImageFormTypes = InferType<typeof schema>;
export default schema;
