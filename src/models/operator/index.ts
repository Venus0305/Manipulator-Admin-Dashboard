import { t } from 'i18n';

const operatorQuery = {
  operatorList: {
    queryKey: ['currentUser', 'operatorList'],
    apiUrl: '/account/operator/operators',
    keepPreviousData: true,
  },
  detail: (id: string) => ({
    queryKey: ['currentUser', 'operatorList', id],
    apiUrl: `/account/operator/${id}`,
  }),
  roles: {
    queryKey: ['currentUser', 'roles'],
    apiUrl: '/account/operator/roles',
    keepPreviousData: true,
  },
  create: {
    apiUrl: `/account/operator/operators/invite`,
    defaultToast: true,
    method: 'post',
    successMessage: t('common:invitationSuccess'),
  },
};

export default operatorQuery;
