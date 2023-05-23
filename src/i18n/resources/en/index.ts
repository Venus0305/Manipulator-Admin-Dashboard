import confirmation from './confirmation';
import validation from './validation';

const en = {
  confirmation,
  validation,
  common: {
    companyName: 'Company Name',
    address: 'location',
    fullName: 'family name',
    tel: 'telephone number',
    email: 'mail address',
    other: 'other',
    lastUpdated: 'Last updated',
    total: 'Total',
    profile: 'Profile',
    editAccount: 'Edit account',
    upload: 'Upload',
    createSystemAccount: 'Create system account',
    editSystemAccount: 'Edit system account',
    createRole: 'Create Role',

    booking: 'Booking',
    bookings: 'Bookings',
    manipulator: 'Manipulator',
    order: 'Order',
    orders: 'Orders',
    search: 'Search',
    importCSV: 'Import (CSV)',
    exportCSV: 'Export (CSV)',
    exportAllCSV: 'Export all (CSV)',
    exportResultsCSV: 'Export results (CSV)',
    provider: 'Provider',
    customer: 'Customer',
    customers: 'Customers',
    status: 'Status',
    action: 'Action',
    view: 'View',
    pending: 'Pending',
    cancelled: 'Cancelled',
    confirmed: 'Confirmed',
    complete: 'Complete',
    changeStatus: 'Change status',
    delete: 'Delete',
    deleted: 'Deleted',
    cancel: 'Cancel',
    duplicate: 'Duplicate',
    viewDetails: 'View Details',
    edit: 'Edit',
    menuItem: 'Menu item',
    duration: 'Duration',
    amount: 'Amount',
    totalAmount: 'Total amount',
    subtotal: 'Subtotal',
    discount: 'Discount',
    statusHistory: 'Status history',
    requested: 'Requested',
    confirmation: 'Confirmation',
    services: 'Services',
    create: 'Create',
    totalChargedToCard: 'Total charged to card',
    cardEndingIn: 'Card ending in',
    chargedOn: 'Charged on',
    min: 'min',
    confirm: 'Confirm',
    ruSure: 'Are you sure?',
    item: 'Item',
    items: 'Items',
    displayName: 'Display name',
    name: 'Name',
    emailAddress: 'Email address',
    phone: 'Phone',
    phoneNumber: 'Phone number',
    lastLogin: 'Last login',
    active: 'Active',
    disabled: 'Disabled',
    tags: 'Tags',
    generatedContent: 'Generated content',
    reviews: 'Reviews',
    basicInfo: 'Basic Information',
    phoneticName: 'Phonetic name',
    birthday: 'Birthday',
    gender: 'Gender',
    registerDate: 'Register date',
    region: 'Region',
    prefecture: 'Prefecture',
    zipCode: 'Zip code',
    lastName: 'Last name',
    firstName: 'First name',
    phoneticLastName: 'Phonetic last name',
    phoneticFirstName: 'Phonetic first name',
    profilePicture: 'Profile picture',
    optional: 'Optional',
    male: 'Male',
    female: 'Female',
    unanswered: 'Unanswered',
    disable: 'Disable',
    enable: 'Enable',
    editProfile: 'Edit profile',
    serviceProviders: 'Service providers',
    schedule: 'Schedule',
    earnings: 'Earnings',
    public: 'Public',
    protect: 'Protect',
    standard: 'Standard',
    saving: 'Saving',
    profileText: 'Profile text',
    city: 'city',
    mapLocation: 'Map location',
    financialInstitution: 'Financial institution',
    financialInstitutionName: 'Financial institution name',
    date: 'Date',
    from: 'From',
    to: 'To',
    grossAmount: 'Gross amount',
    totalFee: 'Total fee',
    netAmount: 'Net amount',
    description: 'Description',
    price: 'Price',
    category: 'Category',
    displayOrder: 'Display order',
    transactions: 'Transactions',
    time: 'Time',
    message: 'Message',
    triggeredBy: 'Triggered by',
    operator: 'Operator',
    admin: 'Admin',
    user: 'User',
    activityLogs: 'Activity logs',
    role: 'Role',
    roles: 'Roles',
    activate: 'Activate',
    deactivate: 'Deactivate',
    prohibited: 'Prohibited',
    all: 'All',
    nameAndDescription: 'Name and description',
    permissions: 'Permissions',
    systemAccounts: 'System accounts',
    changePass: 'Change password',
    change: 'Change',
    username: 'Username',
    password: 'Password',
    usernameAndPassword: 'Username and password',
    users: 'Users',
    systemUsers: 'System users',
    categories: 'Categories',
    uploadAndContinue: 'Upload and continue',
    or: 'Or',
    totalGross: 'Total gross',
    totalNet: 'Total net',
    providerEarnings: 'Provider earnings',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    payoutCycle: 'Payout cycle',
    custom: 'Custom',
    today: 'Today',
    prev: 'Prev',
    next: 'Next',
    customDate: 'Custom date',
    earning: 'Earning',
    commissionFee: 'Commission fee',
    choice: 'Choice',
    staff: 'Staff',
    createNewAccount: 'Create new account',
    logoutText: 'Logout',
    changePasswordText: 'Change password',
    dataChangeSuccess: 'Status changed successfully',
    invitationSuccess: 'A new data created successfully',

    salonInfo: 'Salon info',
    bankInfo: 'Bank info',
    workHour: 'Work hour',
  },

  actionButton: {
    prev: 'PREV',
    next: 'NEXT',
    showToday: 'Show Today',
    showThisWeek: 'Show this week',
    showThisMonth: 'Show this month',
    showThisCycle: 'Show this cycle',
    view: 'View',
  },

  global: {
    yes: 'yes',
    no: 'no',
    ok: 'ok',
    save: 'save',
    edit: 'Edit',
    detail: 'detail',
    noData: 'no data',
    resendVerifyEmail: 'Remove email email',
    cancel: 'cancel',
    networkError: 'There is no Internet connection.',
    update: 'Update',
    addNew: 'New addition',
    more: 'See more',
    less: 'Close',
    search: 'Search',
    pleaseSelect: 'Please select',
    unregistered: 'Unregistered',
    view: 'View',
    searchSection: 'Search conditions',
    notAssigned: 'Not assigned',
    add: 'Add',
    timeDiff: 'End-time should be after start-time than 30 minutes.',
    timeisBefore: 'Second start-time should be after first end-time.',
  },
  login: {
    email: 'Mail address',
    password: 'Password',
    login: 'Sign in',
  },
  errorText: {
    description:
      'The page you are looking for could not be foundooking for could not be found\nPlease try again from the top',
    error: 'Error codecode: 404',
    back: 'Return to the top to the top',
  },
  sideMenu: {
    dashboard: 'Dashboard',
    booking: 'Bookings',
    salon: 'Salon name',
    manipulator: 'Manipulator',
    customer: 'Customers',
    inquiry: 'Inquiry',
    logisticCompany: 'Logistics company',
    ecOwner: 'Client search',
    contract: 'Contract',
    invoice: 'Invoice search',
    unitSetting: 'Unit(Item) Settings',
    qa: 'FAQ',
    adminCompany: 'Admin Company',
    adminAccount: 'Admin Accounts',
    sales: 'Sales',
    operator: 'Operator',
  },
  manipulator: {
    name: 'Name',
    email: 'Email',
    nameKana: 'Alphabet name',
    status: 'Status',
    profile: {
      name: 'Name',
      pr: 'PR message',
      photos: 'Photos',
      nameKana: 'Alphabet name',
      email: 'email',
      profile: 'profile',
      nationalLicenses: 'National Licenses',
      careerStart: 'Career Start',
      createdAt: 'Created At',
    },
  },
  booking: {
    info: 'Booking info',
    id: 'Booking ID',
    date: 'Reservation Date',
    reserved: 'Reserved',
    done: 'Done',
    statusHistoryRequested: 'Customer reserved booking',
    statusHistoryComplete: 'Booking is done',
    statusHistoryCancel: 'Booking has been canceled',
    statusChangeSuccess: 'Status changed successfully',
  },
  salon: {
    id: 'Salon ID',
    name: 'Salon name',
    nameKana: 'Salon aphabet',
    email: 'Email',
    phone: 'Phone number',
    registerDate: 'Register Date',
    valid: 'Valid',
    invalid: 'Invalid',
    awaitingReview: 'Awaiting Review',
    salonInfo: {
      salonInfo: 'Salon info',
      zipcode: 'Zipcode',
      prefecture: 'Prefecture',
      city: 'City',
      address: 'Address',
      access: 'Access',
      attribute: 'Attribute',
      about: 'About salon',
      photo: 'Photo',
    },
    bankInfo: {
      bankInfo: 'Bank info',
      bankName: 'Bank name',
      accountNumber: 'Account number',
      branchName: 'Branch name',
      name: 'Name',
      type: 'Type',
      0: 'Saving',
      1: 'Current',
    },
    workHour: {
      workHour: 'Work hour',
      holiday: 'Holiday',
      0: 'Mon',
      1: 'Tue',
      2: 'Wed',
      3: 'Thu',
      4: 'Fri',
      5: 'Sat',
      6: 'Sun',
    },
  },
  customer: {
    id: 'Customer ID',
    coupon: 'Coupon',
    management: 'Customer management',
    name: 'Customer name',
    nameKana: 'Alphabet name',
    email: 'Email',
    phone: 'Phone number',
    registerDate: 'Register Date',
    active: 'Active',
    inactive: 'Inactive',
    withdraw: 'Withdraw',
    cardTitle: 'Card infomation',
    cardExpire: 'Expire date',
    cardFirstFourNumber: 'First 4 digit number',
    withdrawTitle: 'Withdraw',
    withdrawReason: 'Withdraw reason',
    withdrawDetail: 'Withdraw detail',
  },

  sales: {
    id: 'Transaction ID',
    transactionDate: 'Transaction Date',
    salonName: 'Salon Name',
    manipulatorName: 'Manipulator Name',
    menus: 'Menus',
    salesAmount: 'Sales Amount',
  },

  payment: {
    info: 'Payment information',
    type: 'Payment type',
    ID: 'Payment ID',
    cycle: 'Payment cycle',
    paymentName: 'Payment name',
    totalChargedToCard: 'Total charged amount',
    cardEndingIn: 'First 4 digit number',
    chargedOn: 'Charged date',
  },
  dateViewMode: {
    today: 'Today',
    thisWeek: 'This week',
    thisMonth: 'This month',
    thisCycle: 'This cycle',
    customDate: 'Custom date',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    payoutCycle: 'Payout cycle',
    custom: 'Custom',
  },
  operator: {
    operatorId: 'Operator ID',
    lastLoginDate: 'Last Login Date',
    email: 'Email Address',
    role: 'Role',
  },
};

export default en;
