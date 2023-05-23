const manipulatorQuery = {
  manipulatorList: {
    queryKey: ['currentUser', 'minupulatorList'],
    apiUrl: '/account/operator/manipulators',
    keepPreviousData: true,
  },
  detail: (id: string) => ({
    queryKey: ['currentUser', 'minupulatorList', id],
    apiUrl: `/account/operator/manipulators/${id}`,
  }),
};

export default manipulatorQuery;
