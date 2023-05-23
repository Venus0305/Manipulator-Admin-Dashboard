export type IBookingStatus = 'RESERVED' | 'DONE' | 'CANCELLED';

export type ICustomInfo = {
  email: string;
  name: string;
  nameKana: string;
  phone: string;
};

export type IManipulatorInfo = {
  email: string;
  manipulatorId: string;
  name: string;
  nameKana: string;
  phone: string;
};

export type IPaymentInfo = {
  amount: number;
  cardNumber: string;
  paymentDate: string;
  paymentMethodType: string;
  status: string;
  transactionId: string;
};

export type IBookingItem = {
  key: string;
  _id: string;
  customerName: string;
  manipulatorName: string;
  reservationDate: string;
  salonName: string;
  status: IBookingStatus;
  totalAmount: number;
  updatedAt: string;
};

export type ISalonInfo = {
  description: string;
  email: string;
  name: string;
  nameKana: string;
  phone: string;
  salonId: string;
};

export type IBookingDetailItem = {
  _id: string;
  cancelDeadline: string;
  customerId: string;
  endTime: string;
  estimatedTime: number;
  menuName: string;
  startTime: string;
  status: IBookingStatus;
  customerInfo: ICustomInfo;
  manipulatorInfo: IManipulatorInfo;
  paymentInfo: IPaymentInfo;
  salonInfo: ISalonInfo;
};
