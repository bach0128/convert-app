import type { GroupMaterialItem } from '@/pages/Material/GroupMaterial/hooks';

export const mockGroupMaterial: GroupMaterialItem[] = [
  {
    id: '1',
    code: 'DV',
    name: 'Dịch vụ',
    type: 'Dịch vụ xây dựng vật ',
    vat_rate: '4',
    pit_rate: '2',
    status: 'Active',
  },
  {
    id: '2',
    code: 'HH',
    name: 'Hàng hóa',
    type: 'Phân phối cung cấp hàng hóa',
    vat_rate: '5',
    pit_rate: '1.5',
    status: 'Active',
  },
  {
    id: '3',
    code: 'KH',
    name: 'Khác',
    type: 'Hoạt động kinh doanh khác',
    vat_rate: '4',
    pit_rate: '2.5',
    status: 'Active',
  },
];
