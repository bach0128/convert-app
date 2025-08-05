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
import { ROUTE_PATH } from '@/interfaces/RoutePath';
import { useFormik } from 'formik';
import type { SigninFormValues } from '@/lib/validations/auth.schema/index';
import {
  saveToStorage,
  toastNotification,
  zodToFormikValidate,
} from '@/lib/utils';
import { signinSchema } from '@/lib/validations/auth.schema/index';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { KEY_LOCAL_STORAGE } from '@/interfaces/Storage';
import { useAuthContext } from '@/contexts/authContext';

export default function SignInPage() {
  const { signin, error } = useAuthContext();
  const [isRemember, setIsRemember] = useState(false);

  const formik = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodToFormikValidate(signinSchema),
    onSubmit: async (values) => {
      await signin(values);
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
            Welcome back
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
                    Forgot password?
                  </a>
                </div>
              </div>
            </FormGroup>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <a
                href={ROUTE_PATH.REGISTER}
                className="hover:underline font-medium text-black"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
