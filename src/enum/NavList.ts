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
import MineBusiness from '@/pages/MineBusiness';

const TabID = {
  REVENUE: 'revenue',
  COST: 'cost',
  TAXDECLARATION: 'tax_declaration',
  REPORT: 'report',
  MINEBUSINESS: 'mine_business',
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
      url: TabID.TAXDECLARATION,
      icon: FileChartColumnIncreasing,
    },
    {
      title: 'Báo cáo',
      url: TabID.REPORT,
      icon: ChartPie,
    },
    {
      title: 'Danh mục vật tư, HH',
      url: '#',
      icon: BoxesIcon,
      items: [
        {
          title: 'Đơn vị tính',
          url: '#',
        },
        {
          title: 'Nhóm HH&DV',
          url: '#',
        },
        {
          title: 'Hàng hóa & Dịch vụ',
          url: '#',
        },
      ],
    },
    {
      title: 'Quản lý hộ kinh doanh',
      url: TabID.MINEBUSINESS,
      icon: UserCircle2,
    },
  ],
};

const TabComponents: Record<string, React.ComponentType> = {
  revenue: RevenuePage,
  cost: CostPage,
  tax_declaration: TaxDeclarationPage,
  report: ReportPage,
  mine_business: MineBusiness,
};

export { NavList, TabComponents };
