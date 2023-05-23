const salesQuery = {
  salesList: {
    queryKey: ['currentUser', 'sales'],
    apiUrl: '/sale/operator/sales',
    keepPreviousData: true,
  },
};

export default salesQuery;
