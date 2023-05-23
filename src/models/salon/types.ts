export type ISalonStatus = 'VALID' | 'INVALID' | 'AWAITING';

export type ISalonItem = {
  key: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  nameKana: string;
  phone: string;
  status: ISalonStatus;
};

export type IBankInfo = {
  bankId: string;
  branchId: string;
  transferType: number;
  accountNumber: string;
  accountName: string;
  bankName: string;
  branchName: string;
};

export type IBusinessHours = {
  weekDay: string;
  isHoliday: boolean;
  hours: { startTime: string; endTime: string }[];
};

export type ISalonDetailItem = {
  _id: string;
  name: string;
  nameKana: string;
  status: ISalonStatus;
  email: string;
  lastLogin: string;
  phone: string;
  photos: { name: string; status: string; uid: string; url: string }[];
  description: string;
  postalCode: string;
  addresses: {
    prefectureId: number;
    prefectureName: string;
    city: string;
    stationIds: number[];
    areaId: number;
    address: string;
    stations: { id: number; name: string }[];
  }[];
  access: string[];
  features: { id: number; name: string }[];
  pr: string;
  careerStart: string;
  createdAt: string;
  bankInfo: IBankInfo;
  businessHours: IBusinessHours[];
};
