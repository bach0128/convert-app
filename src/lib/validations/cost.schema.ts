import { z } from 'zod';

export const createInvoiceSchema = z.object({
  taxCode: z
    .string()
    .min(1, { message: 'Vui lòng điền mã số thuế đơn vị bán hàng' }),
  sellerName: z
    .string()
    .min(1, { message: 'Vui lòng điền tên người bán hàng' }),
  sellerCompanyName: z
    .string()
    .min(1, { message: 'Vui lòng điền tên đơn vị bán hàng' }),
});

export type InvoiceCreateFormValues = z.infer<typeof createInvoiceSchema>;
