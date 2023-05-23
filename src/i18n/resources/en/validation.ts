const Validation = {
  // general: {
  permissionDenied: 'There is no authority to perform this operation.',
  objectNotFound: 'The applicable item is not found.',
  somethingWentWrong: 'Page data cannot be obtained.',
  noNetwork: 'There is no Internet connection.',
  invalidField: 'It is an invalid format.',
  requiredField: 'This item is required.',
  completed: 'Has completed.',
  deleteSuccessfully: 'It has been deleted.',
  resendSuccessfully: 'Remove the email normally.',
  passwordRule: 'The password is at least 8 characters or more',
  // },
  // register: {
  existedEmail: '	This email address has already been registered.',
  // },
  // login: {
  notExistEmail: 'Enter your correct email address.',
  notSetFirstPassword: 'The password is not set.',
  invalidLogin: 'login failed.The email address or password is wrong',
  notVerifiedEmail: 'Please confirm the authentication email and complete the registration.',
  // },
  // verifyEmail: {
  verifySuccess: 'E -mail address authentication has been completed.',
  expiredInvitation: 'The invitation deadline has passed.',
  // },
  // changePassword: {
  invalidCurrentPassword: 'The current password is wrong.',
  sameOldPassword: 'The same password as the current password cannot be set.',
  notMatchedPasswords: 'Passwords do not match.',
  notAllowedWhiteSpace: 'White blank characters cannot be used.',
  changePasswordSuccess: 'Password changed.',
  // },
  // profile: {
  invalidBirthday: 'Not a valid date of birth.',
  invalidPhoneNumber: 'Enter the correct phone number.',
  invalidUrl: 'Enter the valid URL.',
  // },
  // review: {
  submitSuccess: 'The evaluation has been completed.',
  expiredEvaluation: 'The evaluation has been sent.',
  // },
  changeEmailSuccess: 'The email change was successful.',
  invalidEmail: 'The email is invalid.',
  invalidNumber: 'This filed should be Number type',
};

export default Validation;
