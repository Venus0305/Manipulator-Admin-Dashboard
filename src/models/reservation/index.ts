import { t } from 'i18n';

const bookingQuery = {
  bookingList: {
    queryKey: ['currentUser', 'bookingList'],
    apiUrl: '/reservation/operator/reservations',
    keepPreviousData: true,
  },
  detail: (id: string) => ({
    queryKey: ['currentUser', 'bookingDetail', id],
    apiUrl: `/reservation/operator/reservations/${id}`,
  }),
  changeStatus: (id?: string) => ({
    apiUrl: `/reservation/operator/reservations/${id}/change-status`,
    method: 'patch',
    successMessage: t('booking:statusChangeSuccess'),
  }),
};

export default bookingQuery;
