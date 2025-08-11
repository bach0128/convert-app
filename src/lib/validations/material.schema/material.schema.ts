import { z } from 'zod';

export const createMaterialSchema = z.object({
  name: z.string({ message: 'Vui lòng điền tên hộ sản phẩm' }),
  unitId: z.string({ message: 'Vui lòng chọn đơn vị tính' }),
  groupId: z.string({ message: 'Vui lòng chọn nhóm hàng hóa dịch vụ' }),
  price: z.string({ message: 'Vui lòng điền giá sản phẩm' }),
  description: z.string(),
});

export type MaterialFormValues = z.infer<typeof createMaterialSchema>;
