export type IOperatorItem = {
  key: string;
  id: string;
  lastLoginDate: string;
  email: string;
  roles: IRole[];
};

export type IRole = {
  id: string;
  name: string;
  code: string;
};
