export type IPrefecture = {
  _id: number;
  provinceId: number;
  provinceName: string;
};

export type ICity = {
  _id: number;
  name: string;
  provinceId: number;
};

export type IFeature = {
  _id: number;
  name: string;
};

export type IBank = {
  _id: string;
  bankName: string;
};
