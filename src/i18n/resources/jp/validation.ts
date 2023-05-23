const Validation = {
  // general: {
  permissionDenied: 'Permission Denied.',
  objectNotFound: "Can't find the item.",
  somethingWentWrong: 'Something went wrong.',
  noNetwork: 'インターネット接続がありません。',
  invalidField: '無効な形式です。',
  requiredField: 'この項目は入力必須です。',
  completed: '完了しました。',
  deleteSuccessfully: '削除しました。',
  resendSuccessfully: 'メールを再送信しました',
  passwordRule: 'パスワードは最低8文字以上です',
  // },
  // register: {
  existedEmail: '	このメールアドレスは既に登録されています。',
  // },
  // login: {
  notExistEmail: '正しいメールアドレスを入力してください。',
  notSetFirstPassword: 'パスワードが設定されていません。',
  invalidLogin: 'ログインに失敗しました。メールアドレス、またはパスワードが間違っています',
  notVerifiedEmail: '認証メールをご確認のうえ、本登録を完了してください。',
  // },
  // verifyEmail: {
  verifySuccess: 'メールアドレス認証が完了しました。',
  expiredInvitation: '招待の期限が過ぎています。',
  // },
  // changePassword: {
  invalidCurrentPassword: '現在のパスワードが間違っています。',
  sameOldPassword: '現在のパスワードと同じパスワードは設定できません。',
  notMatchedPasswords: 'パスワードが一致しません。',
  notAllowedWhiteSpace: '空白文字は使用できません。',
  changePasswordSuccess: 'パスワードを変更しました。',
  // },
  // profile: {
  invalidBirthday: '有効な生年月日ではありません。',
  invalidPhoneNumber: '正しい電話番号を入力してください。',
  invalidUrl: '有効なURLを入力してください。',
  // },
  // review: {
  submitSuccess: '評価が完了しました。',
  expiredEvaluation: '評価は送信済みです。',
  // },
  changeEmailSuccess: 'メールの変更が成功しました。',
  maxLength: '{{number}} 文字以内で入力してください。',
  numberInteger: 'この項目は入力必須です。半角数字で入力してください。',
  maxField: '最大5つまで選択できます',

  invalidEmail: 'このメールアドレスは無効です',
  invalidNumber: 'このフィールドは数値でなければなりません',
};

export default Validation;
