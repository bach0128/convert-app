import type { APIResponse, PaginatedResponse } from '@/enum/api';
import { axiosAPIBaseConfig } from './axios';
import type {
  CreateSaleInvoice,
  SaleInvoiceDto,
} from '@/types/dto/sale-manager';

export const getListSaleInvoice = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<SaleInvoiceDto>>(
      '/sale-invoice'
    );
  return response.data;
};

export const getSaleInvoice = async (id: string) => {
  const response = await axiosAPIBaseConfig.get<SaleInvoiceDto>(
    `/sale-invoice/${id}`
  );
  return response.data;
};

export const updateSaleInvoice = async (
  id: string,
  data: CreateSaleInvoice
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
  >(`/sale-invoice/${id}`, data);

  return response.data.data;
};

// export const createSaleInvoice = async (data: CreatePurchaseInvoice) => {
//   const response = await axiosAPIBaseConfig.post<{
//     success: boolean;
//     inserted: number;
//   }>('/sale-invoice/import', data);

//   return response;
// };
