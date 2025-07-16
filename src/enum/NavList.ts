import {
  FileText,
  FileCheck,
  FileChartColumnIncreasing,
  ChartPie,
  BoxesIcon,
} from 'lucide-react';
import userIcon from '@/assets/icons/user.svg';
import { ROUTE_PATH } from './RoutePath';

const NavList = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: userIcon,
  },
  navMain: [
    {
      title: 'Quản lý doanh thu',
      url: ROUTE_PATH.REVENUE,
      icon: FileText,
      // isActive: true,
    },
    {
      title: 'Quản lý chi phí',
      url: ROUTE_PATH.COST,
      icon: FileCheck,
    },
    {
      title: 'Lập tờ khai thuế',
      url: ROUTE_PATH.TAXDECLARATION,
      icon: FileChartColumnIncreasing,
    },
    {
      title: 'Báo cáo',
      url: ROUTE_PATH.REPORT,
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
  ],
};

export { NavList };
