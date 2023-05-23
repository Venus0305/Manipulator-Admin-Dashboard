import { t } from 'i18n';
import type { LocaleObject } from 'yup';
import { setLocale } from 'yup';

const customLocale: LocaleObject = {
  mixed: {
    required: () => t('validation:requiredField'),
  },
  string: {
    max: ({ max }) => t('validation:maxLength', { number: max }),
    matches: () => t('validation:invalidField'),
    email: () => t('validation:invalidEmail'),
  },
};
setLocale(customLocale);
export default customLocale;
