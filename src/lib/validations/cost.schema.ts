import { z } from 'zod';

export const createInvoiceSchema = z.object({
  taxCode: z
    .string()
    .min(1, { message: 'Vui lòng điền mã số thuế đơn vị bán hàng' }),
  sellerName: z
    .string()
    .min(1, { message: 'Vui lòng điền tên người bán hàng' }),
  sellerAddress: z
    .string()
    .min(1, { message: 'Vui lòng điền tên đơn vị bán hàng' }),
});

export const editInvoicePurchaseSchema = createInvoiceSchema.extend({
  invoiceNumber: z.string(),
});

export type InvoiceCreateFormValues = z.infer<typeof createInvoiceSchema>;
export type InvoiceEditPurchaseFormValues = z.infer<typeof createInvoiceSchema>;
