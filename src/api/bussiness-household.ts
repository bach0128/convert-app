import type {
  BusinessHouseholdItem,
  CreateNewBussinessHousehold,
  DefaultItem,
} from '@/types/dto/bussiness-household';
import { axiosAPIBaseConfig } from './axios';
import type { PaginatedResponse } from '@/enum/api';

export const getIndustryGroup = async () => {
  const response =
    await axiosAPIBaseConfig.get<DefaultItem[]>('/industry-group');
  return response.data;
};

export const getBussinessType = async () => {
  const response =
    await axiosAPIBaseConfig.get<DefaultItem[]>('/bussiness-type');
  return response.data;
};

export const getTaxPaymentMethod = async () => {
  const response = await axiosAPIBaseConfig.get<DefaultItem[]>(
    '/tax-payment-method'
  );
  return response.data;
};

export const getBhh = async () => {
  const response = await axiosAPIBaseConfig.get<
    PaginatedResponse<BusinessHouseholdItem>
  >('/bussiness-household');
  return response.data;
};

export const getBhhById = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<BusinessHouseholdItem>(
    `/bussiness-household/${id}`
  );
  return response.data;
};

export const createBhh = async (data: CreateNewBussinessHousehold) => {
  const response = await axiosAPIBaseConfig.post(`/bussiness-household`, {
    ...data,
  });
  return response.data;
};
