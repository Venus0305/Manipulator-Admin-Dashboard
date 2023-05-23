import type { InferType } from 'yup';
import { boolean, number, object, string } from 'yup';

const schema = object({
  editMode: boolean().default(false),
  bankName: string().required(),
  branchName: string().required(),
  transferType: number().required(),
  accountNumber: string().required(),
  accountName: string().required(),
});

export type SalonProfileBankInfoInputFields = InferType<typeof schema>;
export default schema;
