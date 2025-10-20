import { z } from 'zod';

export const createInvoiceSaleSchema = z.object({
  taxCode: z
    .string()
    .min(1, { message: 'Vui lòng điền mã số thuế đơn vị mua hàng' }),
  customerName: z
    .string()
    .min(1, { message: 'Vui lòng điền tên người mua hàng' }),
  customerCompanyName: z
    .string()
    .min(1, { message: 'Vui lòng điền tên đơn vị mua hàng' }),
});

export const editInvoiceSaleSchema = createInvoiceSaleSchema.extend({
  invoiceNumber: z.string(),
});

export type InvoiceSaleCreateFormValues = z.infer<
  typeof createInvoiceSaleSchema
>;
export type InvoiceSaleEditFormValues = z.infer<typeof createInvoiceSaleSchema>;
