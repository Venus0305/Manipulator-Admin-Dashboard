import confirmation from './confirmation';
import validation from './validation';

const jp = {
  confirmation,
  validation,
  common: {
    companyName: '会社名',
    address: '所在地',
    fullName: '氏名',
    tel: '電話番号',
    email: 'メールアドレス',
    other: 'その他',
    lastUpdated: '最終更新',
    total: '合計',
    profile: 'プロフィール',

    upload: 'アップロード',
    createSystemAccount: 'システムアカウントを作成する',
    editSystemAccount: 'システムアカウントを編集する',
    createRole: '役割の作成',

    booking: '予約',
    bookings: '予約',
    manipulator: '整体師',
    order: '注文',
    orders: '注文',
    search: '探す',
    importCSV: 'インポート (CSV)',
    exportCSV: 'エクスポート (CSV)',
    exportAllCSV: 'すべてエクスポート (CSV)',
    exportResultsCSV: '結果のエクスポート (CSV)',
    provider: 'プロバイダ',
    customer: 'お客様',
    customers: '顧客',
    status: 'ステータス',
    action: 'アクション',
    view: '意見',
    pending: '保留中',
    cancelled: 'キャンセル',
    confirmed: '確認済み',
    complete: '完了',
    changeStatus: 'ステータスを変更する',
    delete: '消去',
    deleted: '消去',
    cancel: 'キャンセル',
    duplicate: '複製',
    viewDetails: '詳細を見る',
    edit: '編集',
    menuItem: 'メニュー項目',
    duration: '間隔',
    amount: '額',
    totalAmount: '合計金額',
    subtotal: '小計',
    discount: '割引',
    statusHistory: 'ステータス履歴',
    requested: '要求された',
    confirmation: '確認',
    services: 'サービス',
    create: '作成',
    totalChargedToCard: 'カードに請求された合計',
    cardEndingIn: 'で終わるカード',
    chargedOn: 'に請求',
    min: '分',
    confirm: '確認',
    ruSure: '本気ですか？',
    item: 'アイテム',
    items: '件',
    displayName: '表示名',
    name: '名前',
    emailAddress: 'メールアドレス',
    phone: '電話',
    phoneNumber: '電話番号',
    lastLogin: '最終ログイン',
    active: 'アクティブ',
    disabled: '無効',
    tags: 'タグ',
    generatedContent: '生成されたコンテンツ',
    reviews: 'レビュー',
    basicInfo: '基本情報',
    phoneticName: 'ふりがな',
    birthday: '誕生日',
    gender: '性別',
    registerDate: '登録日',
    region: '領域',
    prefecture: '県',
    zipCode: '郵便番号',
    lastName: '苗字',
    firstName: 'ファーストネーム',
    phoneticLastName: '姓のふりがな',
    phoneticFirstName: '名のふりがな',
    profilePicture: 'プロフィールの写真',
    optional: 'オプション',
    male: '男',
    female: '女性',
    unanswered: '未回答',
    disable: '無効にする',
    enable: '有効',
    editProfile: 'プロファイル編集',
    serviceProviders: 'サービスプロバイダー',
    schedule: 'スケジュール',
    earnings: '収益',
    public: '公衆',
    protect: '守る',
    standard: '標準',
    saving: '保存',
    profileText: 'プロフィールテキスト',
    city: '街',
    mapLocation: '地図の場所',
    financialInstitution: '金融機関',
    financialInstitutionName: '金融機関名',
    date: '日にち',
    from: 'から',
    to: 'に',
    grossAmount: '総額',
    totalFee: '合計料金',
    netAmount: '正味金額',
    description: '説明',
    price: '価格',
    category: 'カテゴリー',
    displayOrder: '表示順',
    transactions: '取引',
    time: '時間',
    message: 'メッセージ',
    triggeredBy: '引き起こされた',
    operator: 'オペレーター',
    admin: '管理者',
    user: 'ユーザー',
    activityLogs: 'アクティビティ ログ',
    role: 'ロール',
    roles: 'ロール',
    activate: '活性化',
    deactivate: '無効にする',
    prohibited: '禁止',
    all: '全て',
    nameAndDescription: '名前と説明',
    permissions: '権限',
    systemAccounts: 'システム アカウント',
    changePass: 'パスワードを変更する',
    change: '変化する',
    username: 'ユーザー名',
    password: 'パスワード',
    usernameAndPassword: 'ユーザー名とパスワード',
    users: 'ユーザー',
    systemUsers: 'システム ユーザー',
    categories: 'カテゴリー',
    uploadAndContinue: 'アップロードして続行',
    or: 'または',
    totalGross: '総収入',
    totalNet: '合計ネット',
    providerEarnings: 'プロバイダの収益',
    day: '日',
    week: '週',
    month: '月',
    payoutCycle: '支払いサイクル',
    custom: 'カスタム',
    today: '今日',
    prev: '前へ',
    next: '次',
    customDate: 'カスタム日付',
    earning: '収入を得る',
    commissionFee: '手数料',
    choice: '選択',
    staff: 'スタッフ',
    createNewAccount: '新しいアカウントを作成する',
    logoutText: 'ログアウト',
    changePasswordText: 'パスワードを変更する',
    dataChangeSuccess: 'ステータスが正常に変更されました',
    invitationSuccess: 'ユーザを招待しました',

    salonInfo: '整体院情報',
    bankInfo: '口座情報',
    workHour: '営業時間',
  },

  actionButton: {
    prev: '前へ',
    next: '次',
    showToday: '本日を表示',
    showThisWeek: '今週を表示',
    showThisMonth: '今月を表示',
    showThisCycle: 'このサイクルを表示',
    view: 'ビュー',
  },

  global: {
    yes: 'はい',
    no: 'いいえ',
    ok: 'OK',
    save: '保存',
    edit: '編集',
    noData: '検索結果が見つかりません',
    resendVerifyEmail: 'メールを再送',
    cancel: 'キャンセル',
    detail: '詳細',
    networkError: 'インターネット接続がありません。',
    update: '更新',
    addNew: '新規追加',
    more: 'もっと見る',
    less: '閉じる',
    search: '検索',
    deleteConfirm: '本当に削除しますか？',
    pleaseSelect: '選択してください',
    unregistered: '未登録',
    view: '確認',
    searchSection: '検索条件',
    notAssigned: '紐付け未設定',
    add: '追加',
    timeDiff: '終了時間は開始時間の３０分後に設定してください。',
    timeisBefore: '２回目の開始時間は、１回目の終了時間より後に設定してください。',
  },
  login: {
    email: 'メールアドレス',
    password: 'パスワード',
    login: 'ログイン',
  },
  errorText: {
    description: 'お探しのページが見つかりませんでした\nトップから再度お試しください',
    error: 'エラーコード: 404',
    back: 'トップに戻る',
  },
  sideMenu: {
    dashboard: 'ダッシュボード',
    booking: '予約',
    salon: '整体院',
    manipulator: '整体師',
    customer: 'お客様',
    inquiry: '問い合わせ管理',
    logisticCompany: '物流企業検索',
    ecOwner: 'クライアント検索',
    contract: '契約書管理',
    invoice: '請求書検索',
    unitSetting: '単位(品目) 設定',
    qa: 'よくある質問設定',
    adminCompany: '会社情報設定',
    adminAccount: '管理アカウント',
    sales: '販売',
    operator: 'オペレーター',
  },
  booking: {
    info: '予約情報',
    id: '予約ID',
    date: '予約日',
    reserved: '予約済',
    done: '完了',
    statusHistoryRequested: 'お客様が予約を行いました',
    statusHistoryComplete: '予約が完了しました',
    statusHistoryCancel: '予約がキャンセルされました',
    statusChangeSuccess: '予約ステータスが正常に変更されました',
  },
  salon: {
    id: '整体院ID',
    name: '整体院',
    nameKana: 'ふりがな',
    email: 'メールアドレス',
    phone: '電話番号',
    registerDate: '登録日',
    valid: '有効',
    invalid: '無効',
    awaitingReview: 'レビュー待ち',
    salonInfo: {
      salonInfo: '整体院情報',
      zipcode: '郵便番号',
      prefecture: '都道府県',
      city: '市町区村',
      address: '以降の住所',
      access: 'アクセス',
      attribute: '特徴',
      about: '整体院について・注意事項',
      photo: '写真',
    },
    bankInfo: {
      bankInfo: '口座情報',
      bankName: '銀行名',
      accountNumber: '口座番号',
      branchName: '支店名',
      name: '名義',
      type: '預金種目',
      0: '普通',
      1: '当座',
    },
    workHour: {
      workHour: '営業時間',
      holiday: '休日',
      0: '月',
      1: '火',
      2: '水',
      3: '木',
      4: '金',
      5: '土',
      6: '日',
    },
  },
  manipulator: {
    name: 'ユーザー名',
    email: 'メールアドレス',
    nameKana: 'アルファベット名',
    status: 'スターテス',
    profile: {
      name: '名前',
      pr: 'アピールメッセージ',
      photos: '写真',
      nameKana: 'ふりがな',
      email: 'email',
      profile: '詳細メッセージ',
      nationalLicenses: '国家資格',
      careerStart: '従事開始',
      createdAt: '登録日',
    },
  },

  customer: {
    id: 'お客様ID',
    coupon: 'クーポン',
    management: '顧客管理',
    name: 'お客様名',
    nameKana: 'カナ名',
    email: 'メールアドレス',
    phone: '電話番号',
    registerDate: '登録日',
    inactive: '未認証',
    active: '有効',
    withdraw: '退会済み',
    cardTitle: '決済情報',
    cardExpire: '有効期限',
    cardFirstFourNumber: 'クレジットカード上4桁',
    withdrawTitle: '退会',
    withdrawReason: '退会の理由',
    withdrawDetail: '詳細',
  },

  sales: {
    id: '取引ID',
    transactionDate: '取引日',
    salonName: 'サロン名',
    manipulatorName: '整体師名',
    menus: 'メニュー',
    salesAmount: '売上高',
  },
  payment: {
    info: '支払情報',
    type: '支払種類',
    ID: '決済ID',
    cycle: '支払サイクル',
    paymentName: '名義',
    totalChargedToCard: '決済金額',
    cardEndingIn: 'クレジットカード上4桁',
    chargedOn: '決済日',
  },
  dateViewMode: {
    today: '今日',
    thisWeek: '今週',
    thisMonth: '今月',
    thisCycle: 'このサイクル',
    customDate: 'カスタム日付',
    day: '日',
    week: '週',
    month: '月',
    payoutCycle: '支払いサイクル',
    custom: 'カスタム',
  },
  operator: {
    operatorId: 'オペレーター ID',
    lastLoginDate: '最終ログイン日',
    email: 'メールアドレス',
    role: 'ロール',
  },
};

export default jp;