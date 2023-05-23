const commonQuery = {
  prefectures: {
    queryKey: ['salon', 'prefectures'],
    apiUrl: '/salon/common-data/prefectures',
    keepPreviousData: true,
  },
  cities: (id: number) => ({
    queryKey: ['salon', 'cities', id],
    apiUrl: `/salon/common-data/prefectures/${id}/areas`,
  }),
  features: {
    queryKey: ['salon', 'features'],
    apiUrl: '/salon/common-data/features',
    keepPreviousData: true,
  },
  banks: {
    queryKey: ['salon', 'banks'],
    apiUrl: '/salon/common-data/banks',
    keepPreviousData: true,
  },
  branches: (id: string) => ({
    queryKey: ['salon', 'branches', id],
    apiUrl: `/salon/common-data/banks/${id}/branches`,
  }),
};

export default commonQuery;
