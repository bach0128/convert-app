import {
  FileText,
  FileCheck,
  FileChartColumnIncreasing,
  ChartPie,
  BoxesIcon,
  UserCircle2,
} from 'lucide-react';
import RevenuePage from '@/pages/RevenueM';
import CostPage from '@/pages/CostM';
import TaxDeclarationPage from '@/pages/TaxDeclaration';
import ReportPage from '@/pages/Report';
import BusinessHousehold from '@/pages/BusinessHousehold';
import SingleBusinessHousehold from '@/pages/BusinessHousehold/SingleBusinessHousehold';
import type { ComponentType } from 'react';
import UnitMaterial from '@/pages/Material/UnitMaterial';
import GroupMaterial from '@/pages/Material/GroupMaterial';
import Material from '@/pages/Material/Material';
import MaterialList from '@/pages/Material';

const TabID = {
  REVENUE: 'revenue',
  COST: 'cost',
  TAX_DECLARATION: 'tax_declaration',
  REPORT: 'report',
  BUSINESS_HOUSEHOLD: 'business_household',
  MATERIAL_LIST: 'material_list',
  UNIT: 'unit',
  GROUP_MATERIAL: 'group_material',
  MATERIAL: 'material',
};

const NavList = {
  navMain: [
    {
      title: 'Quản lý doanh thu',
      url: TabID.REVENUE,
      icon: FileText,
      // isActive: true,
    },
    {
      title: 'Quản lý chi phí',
      url: TabID.COST,
      icon: FileCheck,
    },
    {
      title: 'Lập tờ khai thuế',
      url: TabID.TAX_DECLARATION,
      icon: FileChartColumnIncreasing,
    },
    {
      title: 'Báo cáo',
      url: TabID.REPORT,
      icon: ChartPie,
    },
    {
      title: 'Danh mục vật tư, HH',
      url: TabID.MATERIAL_LIST,
      icon: BoxesIcon,
      items: [
        {
          title: 'Đơn vị tính',
          url: TabID.UNIT,
        },
        {
          title: 'Nhóm HH&DV',
          url: TabID.GROUP_MATERIAL,
        },
        {
          title: 'Hàng hóa & Dịch vụ',
          url: TabID.MATERIAL,
        },
      ],
    },
    {
      title: 'Quản lý hộ kinh doanh',
      url: TabID.BUSINESS_HOUSEHOLD,
      icon: UserCircle2,
    },
  ],
};

const TabComponents: Record<string, ComponentType> = {
  revenue: RevenuePage,
  cost: CostPage,
  tax_declaration: TaxDeclarationPage,
  report: ReportPage,
  business_household: BusinessHousehold,
  business_household_detail: SingleBusinessHousehold,
  unit: UnitMaterial,
  group_material: GroupMaterial,
  material: Material,
  material_list: MaterialList,
};

export { NavList, TabComponents };
