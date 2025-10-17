import { z } from 'zod';

export const createMaterialSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng điền tên sản phẩm' }),
  unitId: z.string().min(1, { message: 'Vui lòng chọn đơn vị tính' }),
  groupId: z
    .string()
    .min(1, { message: 'Vui lòng chọn nhóm hàng hóa dịch vụ' }),
  price: z.string().min(1, { message: 'Vui lòng điền giá sản phẩm' }),
  description: z.string(),
});

export const updateMaterialSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng điền tên hộ sản phẩm' }),
  unitId: z.string().min(1, { message: 'Vui lòng chọn đơn vị tính' }),
  groupId: z
    .string()
    .min(1, { message: 'Vui lòng chọn nhóm hàng hóa dịch vụ' }),
  price: z.string().min(1, { message: 'Vui lòng điền giá sản phẩm' }),
  description: z.string(),
  statusId: z.number(),
});

export const createMaterialUnitSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng điền tên đơn vị tính' }),
});

export const updateMaterialUnitSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng điền tên đơn vị tính' }),
  statusId: z.number(),
});

export type MaterialCreateFormValues = z.infer<typeof createMaterialSchema>;

export type MaterialUpdateFormValues = z.infer<typeof updateMaterialSchema>;

export type MaterialUnitCreateFormValues = z.infer<
  typeof createMaterialUnitSchema
>;

export type MaterialUnitUpdateFormValues = z.infer<
  typeof updateMaterialUnitSchema
>;
