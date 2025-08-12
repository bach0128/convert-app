import { z } from 'zod';

export const createMaterialSchema = z.object({
  name: z.string({ message: 'Vui lòng điền tên hộ sản phẩm' }).nonempty(),
  unitId: z.string({ message: 'Vui lòng chọn đơn vị tính' }).nonempty(),
  groupId: z
    .string({ message: 'Vui lòng chọn nhóm hàng hóa dịch vụ' })
    .nonempty(),
  price: z.string({ message: 'Vui lòng điền giá sản phẩm' }).nonempty(),
  description: z.string(),
});

export const updateMaterialSchema = z.object({
  name: z.string({ message: 'Vui lòng điền tên hộ sản phẩm' }).nonempty(),
  unitId: z.string({ message: 'Vui lòng chọn đơn vị tính' }).nonempty(),
  groupId: z
    .string({ message: 'Vui lòng chọn nhóm hàng hóa dịch vụ' })
    .nonempty(),
  price: z.string({ message: 'Vui lòng điền giá sản phẩm' }).nonempty(),
  description: z.string(),
  statusId: z.number(),
});

export const createMaterialUnitSchema = z.object({
  name: z.string({ message: 'Vui lòng điền tên đơn vị tính' }).nonempty(),
});

export const updateMaterialUnitSchema = z.object({
  name: z.string({ message: 'Vui lòng điền tên đơn vị tính' }).nonempty(),
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
