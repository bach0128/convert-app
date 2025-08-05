import * as z from 'zod';

export const createBussinessSchema = z.object({
  tax_code: z.number('Vui lòng điền mã số thuế'),
  name: z.string('Vui lòng điền tên hộ kinh doanh'),
});

export type SigninFormValues = z.infer<typeof createBussinessSchema>;
