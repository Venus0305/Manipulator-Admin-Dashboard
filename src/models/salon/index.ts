import { t } from 'i18n';

const salonQuery = {
  salonList: {
    queryKey: ['currentUser', 'salonList'],
    apiUrl: '/salon/operator/salons',
    keepPreviousData: true,
  },
  detail: (id: string) => ({
    queryKey: ['currentUser', 'salon', id],
    apiUrl: `/salon/operator/salons/${id}`,
  }),

  update: (id?: string) => ({
    apiUrl: `/salon/operator/salons/${id}`,
    defaultToast: true,
    method: 'put',
    successMessage: t('common:dataChangeSuccess'),
  }),
};

export default salonQuery;
