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

export interface MaterialItem {
  id: string;
  name: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  unit: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
    type: string;
  };
  price: string;
  status: {
    id: number;
    name: Status_Business;
  };
}

export type CreateNewMaterial = {
  name: string;
  unitId: string;
  groupId: string;
  price: string;
  description?: string;
};
