import type { Status_Business } from '@/enum/status-bussiness';

export interface MaterialGroupItem {
  id: string;
  name: string;
  type: string;
  vat_rate: string;
  pit_rate: string;
  created_at: string;
  updated_at: string;
  status: {
    id: number;
    name: Status_Business;
  };
}

export interface MaterialUnitItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: {
    id: number;
    name: Status_Business;
  };
}
