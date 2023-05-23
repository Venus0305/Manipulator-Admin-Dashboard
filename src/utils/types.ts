export type IError = {
  error: string | { property: string; constraints: Record<string, string> }[];
  data: unknown;
  code: number;
};

export enum ROLES {
  ADMIN = 'ADMIN',
  EC_OWNER = 'EC_OWNER',
}

export enum AdminRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR', // Corresponding to MEMBER in spec
}

export enum EcOwnerRole {
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
}

export enum QACategory {
  HOWTO = 'HOWTO',
  INVOICE = 'INVOICE',
  CONTRACT = 'CONTRACT',
  BUG = 'BUG',
}

export enum Status {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum BankAccountType {
  SAVING = 'SAVING',
  CHECKING = 'CHECKING',
}

export enum UnitCategory {
  BASIC_WORK = 'BASIC_WORK',
  SPECIAL_WORK = 'SPECIAL_WORK',
  FARE = 'FARE',
  MATERIALS = 'MATERIALS',
  STORAGE = 'STORAGE',
  OTHERS = 'OTHERS',
}

export enum MonthlyHandledCountFlag {
  LEVEL6 = 'LEVEL6',
  LEVEL5 = 'LEVEL5',
  LEVEL4 = 'LEVEL4',
  LEVEL3 = 'LEVEL3',
  LEVEL2 = 'LEVEL2',
  LEVEL1 = 'LEVEL1',
  LEVEL0 = 'LEVEL0',
}

export enum SkuCountFlag {
  LEVEL5 = 'LEVEL5',
  LEVEL4 = 'LEVEL4',
  LEVEL3 = 'LEVEL3',
  LEVEL2 = 'LEVEL2',
  LEVEL1 = 'LEVEL1',
  LEVEL0 = 'LEVEL0',
}

export enum ProjectProgressFlag {
  NOT_YET = 'NOT_YET',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}
