import type { APIResponse, PaginatedResponse } from '@/enum/api';
import { axiosAPIBaseConfig } from './axios';
import type {
  CreatePurchaseInvoice,
  PurchaseInvoiceDto,
} from '@/types/dto/cost-manager';

export const getListPurchaseInvoice = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<PurchaseInvoiceDto>>(
      '/purchase-invoice'
    );
  return response.data;
};

export const getPurchaseInvoice = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<PurchaseInvoiceDto>(
    `/purchase-invoice/${id}`
  );
  return response.data;
};

export const createPurchaseInvoice = async (data: CreatePurchaseInvoice) => {
  const response = await axiosAPIBaseConfig.post<
    APIResponse<{
      success: boolean;
      errors: ArrayLike<{
        rowIndex: number;
        messages: string[];
      }>;
    }>
  >('/purchase-invoice/import', data);

  return response.data.data;
};

export const updatePurchaseInvoice = async (
  id: string,
  data: CreatePurchaseInvoice
) => {
  const response = await axiosAPIBaseConfig.patch<
    APIResponse<{
      success: boolean;
      message: string;
      errors: ArrayLike<{
        rowIndex: number;
        messages: string[];
      }>;
    }>
  >(`/purchase-invoice/${id}`, data);

  return response.data.data;
};
