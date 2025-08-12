import {
  getBhhById,
  getBussinessType,
  getTaxPaymentMethod,
  updateBhh,
} from '@/api/bussiness-household';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import Status from '@/components/BaseComponents/Status';
import { Button } from '@/components/Shadcn/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';
import { zodToFormikValidate, toastNotification } from '@/lib/utils';
import {
  type BussinessUpdateFormValues,
  updateBussinessSchema,
} from '@/lib/validations/bussiness.schema';
import { useFormik } from 'formik';

function SingleBusinessHousehold() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['bhh-by-id', id],
    queryFn: () => getBhhById(id || ''),
  });

  const { data: BussinessType, isLoading: loadingType } = useQuery({
    queryKey: ['bussiness-type'],
    queryFn: getBussinessType,
  });

  const { data: TaxPaymentMethod, isLoading: loadingTaxPaymentMethod } =
    useQuery({
      queryKey: ['tax-payment-method'],
      queryFn: getTaxPaymentMethod,
    });

  const formik = useFormik<BussinessUpdateFormValues>({
    initialValues: {
      name: '',
      owner: '',
      address: '',
      bussinessType: 0,
      taxPaymentMethod: 0,
    },
    validate: zodToFormikValidate(updateBussinessSchema),
    onSubmit: async (values) => {
      try {
        await updateBhh(id || '', values);
        toastNotification('Cập nhật hộ kinh doanh thành công', 'success');
        setIsEditing(false);
        refetch();
      } catch (error) {
        if (error instanceof Error) toastNotification(error.message, 'error');
      }
    },
  });

  useEffect(() => {
    if (data)
      formik.setValues({
        name: data.name,
        owner: data.owner,
        address: data.address,
        bussinessType: data.bussinessType.id,
        taxPaymentMethod: data.taxPaymentMethod.id,
      });
  }, [data]);

  return (
    <>
      {(isLoading || loadingTaxPaymentMethod || loadingType) && <Loading />}
      <div className="mt-2 flex items-center gap-2">
        <Button variant={'outline'} onClick={() => navigate(-1)}>
          <ChevronLeft /> Quay lại
        </Button>
        <Button variant={'outline'} onClick={() => setIsEditing(true)}>
          <Pencil /> Chỉnh sửa
        </Button>
      </div>
      <div className="flex justify-start items-center gap-4 mt-2">
        <p className="text-start font-semibold text-gray-400">
          Thông tin hộ kinh doanh{' '}
          <span className="font-semibold text-black">&nbsp;-&nbsp;{id}</span>
        </p>
        {data?.status && <Status status={data?.status.name} />}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Mã số thuế">
            <BaseInput value={data?.tax_code} isReadonly id="tax_code" />
          </FormGroup>
          <FormGroup
            label="Tên hộ kinh doanh"
            isRequrired={isEditing}
            errorMsg={formik.errors.name}
          >
            <BaseInput
              value={formik.values.name}
              isReadonly={!isEditing}
              onChange={formik.handleChange}
              id="name"
              isError={!!(formik.touched.name && formik.errors.name)}
            />
          </FormGroup>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FormGroup
            label="Người đại diện"
            isRequrired={isEditing}
            wrapperClass="col-span-2 text-start"
            errorMsg={formik.errors.owner}
          >
            <BaseInput
              value={formik.values.owner}
              isReadonly={!isEditing}
              onChange={formik.handleChange}
              id="owner"
              isError={!!(formik.touched.owner && formik.errors.owner)}
            />
          </FormGroup>
          <FormGroup label="Email" wrapperClass="col-span-1 text-start">
            <BaseInput isReadonly id="email" value={data?.email} />
          </FormGroup>
          <FormGroup
            label="Số điện thoại"
            isRequrired={!isEditing}
            wrapperClass="col-span-1 text-start"
          >
            <BaseInput value={data?.phone} isReadonly id="phone" />
          </FormGroup>
        </div>
        <FormGroup
          label="Địa chỉ kinh doanh"
          isRequrired={isEditing}
          wrapperClass="text-start"
          errorMsg={formik.errors.address}
        >
          <BaseInput
            value={formik.values.address}
            isReadonly={!isEditing}
            onChange={formik.handleChange}
            id="address"
            isError={!!(formik.touched.address && formik.errors.address)}
          />
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup
            label="Ngành nghề kinh doanh chính"
            isRequrired={isEditing}
            errorMsg={formik.errors.bussinessType}
          >
            {isEditing ? (
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue('bussinessType', +value)
                }
                defaultValue={data?.bussinessType.id.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  <SelectGroup>
                    {BussinessType?.map((item) => (
                      <SelectItem
                        key={item.id}
                        id="bussinessType"
                        value={item.id.toString()}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <BaseInput
                value={data?.bussinessType.name}
                isReadonly={!isEditing}
              />
            )}
          </FormGroup>
          <FormGroup
            label="Hình thức nộp thuế"
            isRequrired={isEditing}
            errorMsg={formik.errors.taxPaymentMethod}
          >
            {isEditing ? (
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue('taxPaymentMethod', +value)
                }
                defaultValue={data?.taxPaymentMethod.id.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn hình thức nộp thuế" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  <SelectGroup>
                    {TaxPaymentMethod?.map((item) => (
                      <SelectItem value={item.id.toString()} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <BaseInput
                value={data?.taxPaymentMethod.name}
                isReadonly={!isEditing}
              />
            )}
          </FormGroup>
        </div>
      </div>
      {isEditing && (
        <div className="w-full flex items-center justify-end mt-4 gap-2">
          <Button variant={'outline'} onClick={() => setIsEditing(false)}>
            Hủy
          </Button>
          <Button onClick={formik.submitForm}>Lưu</Button>
        </div>
      )}
    </>
  );
}

export default SingleBusinessHousehold;
