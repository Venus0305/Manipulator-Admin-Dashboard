const authQuery = {
  currentUser: {
    queryKey: ['currentUser'],
    apiUrl: '/users/me',
  },
  login: {
    apiUrl: '/auth/signin',
  },
  logout: {
    apiUrl: '/auth/logout',
    method: 'get',
  },
  refreshToken: {
    apiUrl: '/auth/refresh',
  },
};

export default authQuery;
