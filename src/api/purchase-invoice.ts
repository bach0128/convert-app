import type { APIResponse, PaginatedResponse } from '@/enum/api';
import { axiosAPIBaseConfig } from './axios';
import type {
  CreatePurchaseInvoice,
  PurchaseInvoiceDto,
  PurchaseInvoiceItem,
} from '@/types/dto/cost-manager';

export const getListPurchaseInvoice = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<PurchaseInvoiceDto>>(
      '/invoice/purchase'
    );
  return response.data;
};

export const getPurchaseInvoice = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<PurchaseInvoiceDto>(
    `/invoice/${id}`
  );
  return response.data;
};

export const createPurchaseInvoice = async (data: CreatePurchaseInvoice) => {
  const response = await axiosAPIBaseConfig.post('/invoice/import', data);

  return response.data.data;
};

export const updatePurchaseInvoice = async (
  id: string,
  data: PurchaseInvoiceItem[]
) => {
  const response = await axiosAPIBaseConfig.patch<
    APIResponse<{
      success: boolean;
      message: string;
      errors: string;
    }>
  >(`/invoice/${id}/items`, data);

  return response.data.data;
};
