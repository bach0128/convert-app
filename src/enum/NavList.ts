import {
  FileText,
  FileCheck,
  FileBarChartIcon as FileChartColumnIncreasing,
  PieChartIcon as ChartPie,
  Boxes,
  UserCircle2,
} from 'lucide-react';
import { TabID, type NavItem } from '@/types/nav';

export const NavList: NavItem[] = [
  {
    title: 'Quản lý doanh thu',
    url: TabID.REVENUE,
    icon: FileText,
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
    icon: Boxes,
    items: [
      {
        title: 'Đơn vị tính',
        url: TabID.UNIT,
        icon: FileText,
      },
      {
        title: 'Nhóm HH&DV',
        url: TabID.GROUP_MATERIAL,
        icon: FileText,
      },
      {
        title: 'Hàng hóa & Dịch vụ',
        url: TabID.MATERIAL,
        icon: FileText,
      },
    ],
  },
  {
    title: 'Quản lý hộ kinh doanh',
    url: TabID.BUSINESS_HOUSEHOLD,
    icon: UserCircle2,
  },
];
