import SearchInput from '@/components/BaseComponents/SearchInput';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';
import { useBusinessHousehold } from './hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { useQuery } from '@tanstack/react-query';
import {
  createBhh,
  getBhh,
  getBussinessType,
  getIndustryGroup,
  getTaxPaymentMethod,
} from '@/api/bussiness-household';
import Loading from '@/components/BaseComponents/Loading';
import { useFormik } from 'formik';
import { toastNotification, zodToFormikValidate } from '@/lib/utils';
import {
  createBussinessSchema,
  type BussinessFormValues,
} from '@/lib/validations/bussiness.schema';
import { ChevronLeft, Plus } from 'lucide-react';
import type { FormikProps } from 'formik';

type BussinessFormik = FormikProps<BussinessFormValues>;

function BusinessHousehold() {
  const navigate = useNavigate();
  const { columns } = useBusinessHousehold();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const { data: IndustryGroup, isLoading: isLoadingGroup } = useQuery({
    queryKey: ['industry-group'],
    queryFn: getIndustryGroup,
  });

  const {
    data: listBhh,
    isLoading: loadingBhh,
    refetch,
  } = useQuery({
    queryKey: ['list-bhh'],
    queryFn: getBhh,
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

  const formik: BussinessFormik = useFormik<BussinessFormValues>({
    initialValues: {
      name: '',
      tax_code: '',
      email: '',
      owner: '',
      phone: '',
      address: '',
      bussinessType: 0,
      taxPaymentMethod: 0,
    },
    validate: zodToFormikValidate(
      createBussinessSchema,
      () => formik.submitCount
    ),
    onSubmit: async (values) => {
      try {
        await createBhh(values);
        toastNotification('Tạo hộ kinh doanh mới thành công', 'success');
        setIsOpenCreate(false);
        formik.resetForm();
        refetch();
      } catch (error) {
        if (error instanceof Error) toastNotification(error.message, 'error');
      }
    },
  });

  return (
    <div>
      {(isLoadingGroup ||
        loadingTaxPaymentMethod ||
        loadingBhh ||
        loadingType) && <Loading />}
      <div className="flex gap-2 items-center ">
        <Button variant={'outline'} onClick={() => navigate(-1)}>
          {' '}
          <ChevronLeft />
          {`Quay lại`}
        </Button>
        <Button variant={'outline'} onClick={() => setIsOpenCreate(true)}>
          <Plus /> Thêm HKD
        </Button>
      </div>
      <>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <SearchInput placeholder="Tìm kiếm" />
            <div className="flex items-center gap-1.5">
              Phân nhóm HKD:
              <Select>
                <SelectTrigger className="max-w-[250px] truncate">
                  <SelectValue placeholder="Chọn phân nhóm hộ kinh doanh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {IndustryGroup?.map((item) => (
                      <SelectItem value={item.id.toString()} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              Ngành nghề chính:
              <Select>
                <SelectTrigger className="max-w-[280px] truncate">
                  <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  <SelectGroup>
                    {BussinessType?.map((item) => (
                      <SelectItem value={item.id.toString()} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant={'outline'} size={'sm'}>
            Xuất file
          </Button>
        </div>
        {listBhh && (
          <div className="mt-4 max-w-full">
            <TableData columns={columns} data={listBhh.results} />
          </div>
        )}
      </>
      {/**TODO: add role admin for show this */}
      <ConfirmModal
        open={isOpenCreate}
        onOpenChange={setIsOpenCreate}
        title={'Tạo hộ kinh doanh mới'}
        content={
          <form className="flex flex-col gap-3">
            <div className="flex w-full gap-2">
              <FormGroup
                label="Mã số thuế"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.tax_code}
              >
                <BaseInput
                  id="tax_code"
                  value={formik.values.tax_code}
                  onChange={formik.handleChange}
                  isError={
                    !!(formik.touched.tax_code && formik.errors.tax_code)
                  }
                />
              </FormGroup>
              <FormGroup
                label="Tên hộ kinh doanh"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.name}
              >
                <BaseInput
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.name && formik.errors.name)}
                />
              </FormGroup>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <FormGroup
                label="Người đại diện"
                isRequrired
                wrapperClass="col-span-2"
                errorMsg={formik.errors.owner}
              >
                <BaseInput
                  id="owner"
                  value={formik.values.owner}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.owner && formik.errors.owner)}
                />
              </FormGroup>
              <FormGroup
                label="Email"
                isRequrired
                errorMsg={formik.errors.email}
              >
                <BaseInput
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.email && formik.errors.email)}
                />
              </FormGroup>
              <FormGroup
                label="Số điện thoại"
                isRequrired
                errorMsg={formik.errors.phone}
              >
                <BaseInput
                  type="text"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.phone && formik.errors.phone)}
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup
                label="Địa chỉ kinh doanh"
                isRequrired
                errorMsg={formik.errors.address}
              >
                <BaseInput
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.address && formik.errors.address)}
                />
              </FormGroup>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <FormGroup
                label="Ngành nghề kinh doanh chính"
                isRequrired
                errorMsg={formik.errors.bussinessType}
              >
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue('bussinessType', +value)
                  }
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
              </FormGroup>
              <FormGroup
                label="Hình thức nộp thuế"
                isRequrired
                errorMsg={formik.errors.taxPaymentMethod}
              >
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue('taxPaymentMethod', +value)
                  }
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
              </FormGroup>
            </div>
          </form>
        }
        handleSubmit={formik.handleSubmit}
        confirmText="Tạo mới"
      />
    </div>
  );
}

export default BusinessHousehold;
