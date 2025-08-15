import { useEffect, useState } from 'react';
import { Button } from '@/components/Shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Shadcn/card';
import { Label } from '@/components/Shadcn/label';
import { Checkbox } from '@/components/Shadcn/checkbox';
import { Separator } from '@/components/Shadcn/separator';
import { ROUTE_PATH } from '@/enum/route-path';
import { useFormik } from 'formik';
import type { SigninFormValues } from '@/lib/validations/auth.schema/index';
import {
  isRememberMe,
  saveToStorage,
  toastNotification,
  zodToFormikValidate,
} from '@/lib/utils';
import { signinSchema } from '@/lib/validations/auth.schema/index';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { KEY_LOCAL_STORAGE } from '@/enum/Storage';
import { useAuth } from '@/hooks/use-auth';
import type { FormikProps } from 'formik';

type SigninFormik = FormikProps<SigninFormValues>;

export default function SignInPage() {
  const [isRemember, setIsRemember] = useState(false);
  const { error, signin } = useAuth();

  const formik: SigninFormik = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodToFormikValidate(signinSchema, () => formik.submitCount),
    onSubmit: async (values) => {
      try {
        const result = await signin(values);
        saveToStorage(
          KEY_LOCAL_STORAGE.ACCESS_TOKEN,
          result.access_token,
          isRememberMe()
        );

        saveToStorage(
          KEY_LOCAL_STORAGE.REFRESH_TOKEN,
          result.refresh_token,
          isRememberMe()
        );

        window.location.href = '/';
      } catch (error) {
        if (error instanceof Error) toastNotification(error.message, 'error');
      }
    },
  });

  useEffect(() => {
    if (error) toastNotification(error, 'error');
  }, [error]);

  useEffect(() => {
    saveToStorage(
      KEY_LOCAL_STORAGE.REMEMBER_ME,
      isRemember ? 'true' : 'false',
      true
    );
  }, [isRemember]);

  return (
    <div className="flex-1 h-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Chào mừng quay trở lại
          </CardTitle>
          <CardDescription className="text-center">
            Vui lòng nhập email và mật khẩu để đăng nhập.
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <FormGroup label="Email" isRequrired errorMsg={formik.errors.email}>
              <div className="relative">
                <BaseInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
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
                placeholder="Điền mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
                isError={!!(formik.touched.password && formik.errors.password)}
              />
              <div className="flex items-center justify-between mt-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    onCheckedChange={(checked) =>
                      setIsRemember(checked === true)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <div className="text-end">
                  <a
                    href={ROUTE_PATH.RESET_PASSWORD}
                    className="text-sm hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
            </FormGroup>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              {'Bạn chưa có tài khoản? '}
              <a
                href={ROUTE_PATH.SIGNUP}
                className="hover:underline font-medium text-black"
              >
                Đăng ký
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
