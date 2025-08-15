import { Button } from '@/components/Shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Shadcn/card';
import { ROUTE_PATH } from '@/enum/route-path';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { useFormik } from 'formik';
import { toastNotification, zodToFormikValidate } from '@/lib/utils';
import {
  signupSchema,
  type SignUpFormValues,
} from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

import type { FormikProps } from 'formik';

type SignupFormik = FormikProps<SignUpFormValues>;

export default function SignUpPage() {
  const { error, signup } = useAuth();
  const formik: SignupFormik = useFormik<SignUpFormValues>({
    initialValues: {
      tax_code: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodToFormikValidate(signupSchema, () => formik.submitCount),
    onSubmit: async (values) => {
      await signup({
        tax_code: values.tax_code,
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toastNotification('Đăng ký tài khoản thành công.', 'success');
      window.location.href = '/signin';
    },
  });

  useEffect(() => {
    if (error) toastNotification(error, 'error');
  }, [error]);

  return (
    <div className="flex items-center justify-center flex-1 h-full bg-gray-50">
      <Card className="w-full max-w-xl px-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Phần mềm kế toán
          </CardTitle>
          <CardDescription className="text-center">
            Hệ thống kế toán đơn giản, hỗ trợ hộ kinh doanh kê khai doanh thu,
            lập tờ khai thuế và quản lý hóa đơn hiệu quả.
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <FormGroup
              label="Mã số thuế"
              isRequrired
              errorMsg={formik.errors.name}
            >
              <BaseInput
                id="tax_code"
                name="tax_code"
                placeholder="Nhập mã số thuế"
                value={formik.values.tax_code}
                onChange={formik.handleChange}
                isError={!!(formik.touched.tax_code && formik.errors.tax_code)}
              />
            </FormGroup>
            <FormGroup
              label="Tên người đăng ký"
              isRequrired
              errorMsg={formik.errors.name}
            >
              <BaseInput
                id="name"
                name="name"
                placeholder="Tên người đăng ký"
                value={formik.values.name}
                onChange={formik.handleChange}
                isError={!!(formik.touched.name && formik.errors.name)}
              />
            </FormGroup>

            <FormGroup label="Email" isRequrired errorMsg={formik.errors.email}>
              <div className="relative">
                <BaseInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.email && formik.errors.email)}
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Mật khẩu"
              isRequrired
              errorMsg={formik.errors.password}
            >
              <BaseInput
                id="password"
                name="password"
                type="password"
                placeholder="Tạo mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
                isError={!!(formik.touched.password && formik.errors.password)}
              />
            </FormGroup>

            <div className="space-y-2">
              <FormGroup label="Xác nhận mật khẩu">
                <BaseInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </FormGroup>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full">
              Đăng ký tài khoản
            </Button>

            <div className="text-center text-sm text-gray-600">
              Bạn đã có tài khoản?{' '}
              <a
                href={ROUTE_PATH.SIGNIN}
                className="text-black hover:underline font-medium"
              >
                Đăng nhập ngay
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
