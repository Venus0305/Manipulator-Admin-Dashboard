import i18n from 'i18n';
import type { InferType } from 'yup';
import { boolean, number, object, string } from 'yup';

const schema = object({
  editMode: boolean().default(false),
  name: string().required(),
  nameKana: string().required(),
  email: string().email().required(),
  phone: number().typeError(i18n.t('validation:invalidNumber')).required(),
});

export type SalonProfileBasicInfoInputFields = InferType<typeof schema>;
export default schema;
