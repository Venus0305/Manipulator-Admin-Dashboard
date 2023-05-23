/* eslint-disable max-len */
export const INSTALLATION_ID = '@skeleton_installationId';

export const REG_EXP = {
  PASSWORD_POLICY:
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@^_`{|}~\[\]]{8,}$/,
  KATAKANA: /^[ｧ-ﾝﾞﾟァ-・ヽヾ゛゜ー()-.（-）]+$/,
  // eslint-disable-next-line no-useless-escape
  URL: /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*-?_]{8,}$/,
  PHONE: /^[0-9]{10,12}$/,
  MIN_8_CHARS: /.{8,}/,
  ZIP_CODE: /[0-9]{3}-[0-9]{4}/,
};

export enum DateFormat {
  MONTH_YEAR_SHORT = 'MM/YY',
  YEAR_MONTH_DATE = 'YYYY/MM/DD',
  YEAR_MONTH_DATE_DASH = 'YYYY-MM-DD',
  YEAR_MONTH = 'YYYY/MM',
  YEAR_MONTH_DASH = 'YYYY-MM',
  YEAR_MONTH_DATE_HOUR = 'YYYY/MM/DD HH:mm',
  YEAR_MONTH_DATE_HOUR_DASH = 'YYYY-MM-DD HH:mm',
  HOUR_YEAR_MONTH_DATE = 'HH:mm YYYY-MM-DD',
  HOUR_YEAR_MONTH_DATE_JP = 'HH:mm YYYY年MM月DD日',
  YEAR_MONTH_DATE_HOUR_JP = 'YYYY年MM月DD日 HH:mm',
  YEAR_MONTH_DATE_JP = 'YYYY年MM月DD日',
  YEAR_MONTH_DATE_HOUR_MS = 'YYYY/MM/DD HH:mm:ss',
  YYYY_MM_DD_HH_MM_SS_DASH = 'YYYY-MM-DD HH:mm:ss',
  MONTH_DATE_HOUR_JP = 'YYYY年MM月DD日 HH時mm分',
  ISO = 'YYYY-MM-DDTHH:mm:ss.sss[Z]',
}

export const QA_CATEGORT_TEXT = {
  HOWTO: '機能・操作方法',
  INVOICE: '請求書',
  CONTRACT: '契約書',
  BUG: '不具合',
};

export const STATUS_TEXT = {
  ACTIVE: 'アクティブ',
  INACTIVE: '非アクティブ',
  DELETED: '削除',
};

export const OPTION_STATUS_TEXT = {
  ACTIVE: 'アクティブ',
  INACTIVE: '非アクティブ',
};

export const ADMIN_ROLE_TEXT = {
  ADMIN: '管理者',
  OPERATOR: 'メンバー', // Corresponding to MEMBER in spec
};

export const EC_OWNER_ROLE_TEXT = {
  OWNER: 'オーナー',
  MEMBER: 'メンバー', // Corresponding to MEMBER in spec
};

export const QC_STATUS_TEXT = {
  ACTIVE: '公開',
  INACTIVE: '下書き',
};

export const BANK_ACCOUNT_TYPE_TEXT = {
  SAVING: '普通口座',
  CHECKING: '当座口座',
};

export const UNIT_CATEGORY_TEXT = {
  BASIC_WORK: '基本作業',
  SPECIAL_WORK: '特殊作業',
  FARE: '運賃',
  MATERIALS: '資材',
  STORAGE: '保管',
  OTHERS: 'その他',
};

export const INQUIRY_MIN_YEAR = 2023;

export const MONTHLY_HANDLED_COUNT_FLAG_TEXT = {
  LEVEL6: '10,001件〜',
  LEVEL5: '5,001〜10,000件',
  LEVEL4: '3,001〜5,000件',
  LEVEL3: '1,001〜3,000件',
  LEVEL2: '501〜1,000件',
  LEVEL1: '1〜500件',
  LEVEL0: '通販事業を開始していない',
};

export const SKU_COUNT_FLAG_TEXT = {
  LEVEL5: '1,001〜',
  LEVEL4: '501〜1,000',
  LEVEL3: '101〜500',
  LEVEL2: '11〜100',
  LEVEL1: ' 1〜10',
  LEVEL0: ' 通販事業を開始していない',
};

export const PROJECT_PROGRESS_FLAG_TEXT = {
  NOT_YET: '未着手',
  IN_PROGRESS: '進行中',
  COMPLETE: '完了',
};

export const BADGE_COLOR: any = {
  ACCOUNT_STATUS: {
    active: {
      text: 'status:active',
      color: 'green',
    },
    pending: {
      text: 'status:pending',
      color: 'yellow',
    },
    disabled: {
      text: 'status:disabled',
      color: 'gray',
    },
  },
  PAYOUT_STATUS: {
    COMPLETED: {
      text: 'COMPLETED',
      color: 'cyan',
    },
    UNCOMPLETE: {
      text: 'UNCOMPLETE',
      color: 'volcano',
    },
  },
  SALON_ACCOUNT_STAUS: {
    VALID: {
      text: 'salon:valid',
      color: 'blue',
    },
    INVALID: {
      text: 'salon:invalid',
      color: 'red',
    },
    AWAITING_REVIEW: {
      text: 'salon:awaitingReview',
      color: 'gray',
    },
  },
};

export const BOOKING_STATUS = {
  RESERVED: {
    value: 'RESERVED',
    text: 'booking:reserved',
    color: 'cyan',
  },
  DONE: {
    value: 'DONE',
    text: 'booking:done',
    color: 'blue',
  },
  CANCELLED: {
    value: 'CANCELLED',
    text: 'common:cancelled',
    color: 'orange',
  },
};

export const TRANSLATION = {
  male: 'profile:male',
  female: 'profile:female',
  unanswered: 'profile:unanswered',
  protect: 'type:protect',
  public: 'type:public',
  saving: 'type:saving',
  standard: 'type:standard',
};

export const viewDatePickerOptions = [
  { label: 'day', value: 'DAY' },
  { label: 'week', value: 'WEEK' },
  { label: 'month', value: 'MONTH' },
  { label: 'custom', value: 'CUSTOM' },
];
