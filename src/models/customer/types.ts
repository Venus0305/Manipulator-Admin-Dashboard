type IType = 'Owner' | 'Normal';
type IStatus = 'ACTIVE' | 'INACTIVE' | 'WITHDRAW';

type ISalon = {
  access: string[];
  authority: string;
  name: string;
  nameKana: string;
  salonId: string;
};

export type ICustomerItem = {
  key: string;
  _id: string;
  createdAt: string;
  email: string;
  isPublished: boolean;
  name: string;
  nameKana: string;
  salon: ISalon[];
  status: IStatus;
  type: IType;
  updatedAt: string;
};

export type ICustomerDetailItem = {
  CardExpire: string;
  CardNumber: string;
  email: string;
  lastLogin: string;
  name: string;
  nameKana: string;
  phone: string;
  registryDate: string;
  status: IStatus;
};
