import type { Status_Business } from '@/enum/status-bussiness';

export interface BusinessHouseholdItem {
  id: string;
  tax_code: string;
  name: string;
  user_id?: number;
  owner: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  bussinessType: DefaultItem;
  taxPaymentMethod: DefaultItem;
  status: {
    id: number;
    name: Status_Business;
  };
  industryGroup: DefaultItem;
}

export interface DefaultItem {
  id: number;
  name: number;
}

export type CreateNewBussinessHousehold = {
  tax_code: number;
  name: string;
  owner: string;
  address: string;
  phone: string;
  bussinessType: number;
  taxPaymentMethod: number;
};
