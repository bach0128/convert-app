export const TabID = {
  REVENUE: 'revenue',
  COST: 'cost',
  TAX_DECLARATION: 'tax_declaration',
  REPORT: 'report',
  MATERIAL_LIST: 'material-list',
  UNIT: 'unit',
  GROUP_MATERIAL: 'group',
  MATERIAL: 'material',
  BUSINESS_HOUSEHOLD: 'business_household',
};

export type TabIDType = (typeof TabID)[keyof typeof TabID];

export interface NavItem {
  title: string;
  url: TabIDType;
  icon: string;
  items?: NavItem[];
}
