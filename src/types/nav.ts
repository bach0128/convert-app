import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

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
  COST_INVOICE: 'cost/:id',
};

export type TabIDType = (typeof TabID)[keyof typeof TabID];

export interface NavItem {
  title: string;
  url: TabIDType;
  icon:
    | string
    | ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >;
  items?: NavItem[];
}
