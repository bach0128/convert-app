import { z } from 'zod';

export const createBussinessSchema = z.object({
  tax_code: z.coerce.number().min(1, { message: 'Vui lòng điền mã số thuế' }),
  name: z.string().min(1, { message: 'Vui lòng điền tên hộ kinh doanh' }),
  owner: z.string().min(1, { message: 'Vui lòng điền tên người đại diện' }),
  address: z.string().min(1, { message: 'Vui lòng điền địa chỉ kinh doanh' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 chữ số' })
    .max(12, { message: 'Số điện thoại không được vượt quá 12 chữ số' }),
  email: z.string().email({ message: 'Vui lòng điền email hợp lệ' }),
  taxPaymentMethod: z.coerce
    .number()
    .min(1, { message: 'Vui lòng chọn hình thức nộp thuế' }),
  bussinessType: z.coerce
    .number()
    .min(1, { message: 'Vui lòng chọn ngành nghề kinh doanh' }),
});

export type BussinessFormValues = z.infer<typeof createBussinessSchema>;
