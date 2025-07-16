const ROUTE_PATH = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SIGNIN: '/signin',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  VERIFY_CODE: '/verify-code',
  CHANGE_PASSWORD: '/change-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '*',

  /// page
  REVENUE: '/revenue',
  COST: '/cost',
  TAXDECLARATION: '/tax_declaration',
  REPORT: '/report',
} as const;

export { ROUTE_PATH };
