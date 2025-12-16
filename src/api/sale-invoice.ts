import type { APIResponse, PaginatedResponse } from '@/enum/api';
import { axiosAPIBaseConfig } from './axios';
import type { SaleInvoiceDto, SaleInvoiceItem } from '@/types/dto/sale-manager';

export const getListSaleInvoice = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<SaleInvoiceDto>>(
      '/invoice/sale'
    );
  return response.data;
};

export const getSaleInvoice = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<SaleInvoiceDto>(
    `/invoice/${id}`
  );
  return response.data;
};

export const updateSaleInvoice = async (
  id: string,
  data: SaleInvoiceItem[]
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

export const createSaleInvoice = async ({ rawData }: { rawData: string }) => {
  const response = await axiosAPIBaseConfig.post<{
    success: boolean;
  }>('/invoice/import', { rawData });

  return response;
};
