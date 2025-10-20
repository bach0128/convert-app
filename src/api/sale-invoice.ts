import type { PaginatedResponse } from '@/enum/api';
import { axiosAPIBaseConfig } from './axios';
import type { SaleInvoiceDto } from '@/types/dto/sale-manager';

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

// export const createSaleInvoice = async (data: CreatePurchaseInvoice) => {
//   const response = await axiosAPIBaseConfig.post<{
//     success: boolean;
//     inserted: number;
//   }>('/sale-invoice/import', data);

//   return response;
// };
