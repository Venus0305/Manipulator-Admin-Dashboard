export type ISalesMenu = {
  currency: string;
  estimatedTime: number;
  menuId: string;
  name: string;
  order: number;
  price: number;
  status: string;
};

export type ISalesItem = {
  manipulatorName: string;
  salonName: string;
  salonId: string;
  transactionDate: string;
  transactionId: string;
  menuName: string;
  saleAmount: number;
};

export type VIEW_MODE = 'DAY' | 'WEEK' | 'MONTH' | 'CUSTOM';
