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

export default function SignUpPage() {
  const { error, signup } = useAuth();
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodToFormikValidate(signupSchema),
    onSubmit: async (values) => {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Tạo mới tài khoản
          </CardTitle>
          <CardDescription className="text-center">
            Điền thông tin để tạo mới
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <FormGroup label="Name" isRequrired errorMsg={formik.errors.name}>
              <BaseInput
                id="name"
                name="name"
                placeholder="name"
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
              label="Password"
              isRequrired
              errorMsg={formik.errors.password}
            >
              <BaseInput
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isError={!!(formik.touched.password && formik.errors.password)}
              />
            </FormGroup>

            <div className="space-y-2">
              <FormGroup label="Confirm Password">
                <BaseInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </FormGroup>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-2">
            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a
                href={ROUTE_PATH.SIGNIN}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
