const customerQuery = {
  customerList: {
    queryKey: ['currentUser', 'customers'],
    apiUrl: '/account/operator/customers',
    keepPreviousData: true,
  },
  detail: (id: string) => ({
    queryKey: ['currentUser', 'customer', id],
    apiUrl: `/account/operator/customers/${id}`,
  }),
};

export default customerQuery;
