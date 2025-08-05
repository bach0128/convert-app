import * as z from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Signup Schema
export const signupSchema = z
  .object({
    name: z.string({ message: 'Tên bắt buộc phải nhập' }),
    email: z
      .string({ message: 'Email bắt buộc phải nhập' })
      .email('Email không hợp lệ'),
    password: z
      .string({ message: 'Vui lòng điền mật khẩu' })
      .min(6, 'Mật khẩu có ít nhất 6 ký tự'),
    confirmPassword: z.string({ message: 'Vui lòng xác nhận mật khẩu' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  });

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignUpFormValues = z.infer<typeof signupSchema>;
