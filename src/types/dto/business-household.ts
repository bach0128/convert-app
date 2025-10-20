import type { Status_Business } from '@/enum/Status';

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
  businessType: DefaultItem;
  taxPaymentMethod: DefaultItem;
  status: {
    id: number;
    name: Status_Business;
  };
  industryGroup: DefaultItem;
  email: string;
}

export interface DefaultItem {
  id: number;
  name: number;
}

export type CreateNewBusinessHousehold = {
  tax_code: string;
  name: string;
  owner: string;
  address: string;
  phone: string;
  businessType: number;
  taxPaymentMethod: number;
};

export type UpdateBusinessHousehold = {
  name: string;
  owner: string;
  address: string;
  businessType: number;
  taxPaymentMethod: number;
};
