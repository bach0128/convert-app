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
  TAX_DECLARATION: '/tax_declaration',
  REPORT: '/report',

  // hộ kinh doanh
  BUSINESS_HOUSEHOLD: '/business_household',
  SINGLE_BUSINESS_HOUSEHOLD: '/business_household/:id',

  //Hàng hóa & Dịch vụ
  UNIT: '/unit',
  GROUP_MATERIAL: '/group_material',
  MATERIAL: '/material',
  MATERIAL_LIST: '/material_list',
} as const;

export { ROUTE_PATH };
