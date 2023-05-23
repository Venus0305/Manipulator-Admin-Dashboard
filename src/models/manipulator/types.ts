type IType = 'Owner' | 'Normal';
type IStatus = 'ACTIVE' | 'INACTIVE';

type ISalon = {
  access: string[];
  authority: string;
  name: string;
  nameKana: string;
  salonId: string;
};

export type IManipulatorItem = {
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

export type IManipulatorDetailItem = {
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
  profile: string;
};
