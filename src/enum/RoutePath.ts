const ROUTE_PATH = {
  HOME: '/',
  SIGNIN: '/signin',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  VERIFY_CODE: '/verify-code',
  CHANGE_PASSWORD: '/change-password',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '*',

  /// page
  REVENUE: '/revenue',
  COST: '/cost',
  TAXDECLARATION: '/tax_declaration',
  REPORT: '/report',
  MINEBUSINESS: '/mine_business',
} as const;

export { ROUTE_PATH };
