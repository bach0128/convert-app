import type {
  BusinessHouseholdItem,
  CreateNewBusinessHousehold,
  DefaultItem,
  UpdateBusinessHousehold,
} from '@/types/dto/business-household';
import { axiosAPIBaseConfig } from './axios';
import type { PaginatedResponse } from '@/enum/api';

export const getIndustryGroup = async () => {
  const response =
    await axiosAPIBaseConfig.get<DefaultItem[]>('/industry-group');
  return response.data;
};

export const getBusinessType = async () => {
  const response =
    await axiosAPIBaseConfig.get<DefaultItem[]>('/business-type');
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
  >('/business-household');
  return response.data;
};

export const getBhhById = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<BusinessHouseholdItem>(
    `/business-household/${id}`
  );
  return response.data;
};

export const createBhh = async (data: CreateNewBusinessHousehold) => {
  const response = await axiosAPIBaseConfig.post(`/business-household`, {
    ...data,
  });
  return response.data;
};

export const updateBhh = async (id: string, data: UpdateBusinessHousehold) => {
  const response = await axiosAPIBaseConfig.patch(
    `/business-household/${id}`,
    data
  );
  return response;
};
