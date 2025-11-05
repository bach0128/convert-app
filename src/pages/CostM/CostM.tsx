import { CalendarBase } from '@/components/BaseComponents/Calendar';
import ExcelUploader from '@/components/BaseComponents/ExcelUploader';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import type { ExcelData } from '@/types/excelFile';
import { ChevronLeft, File, FilterIcon, Plus, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCostManager } from './hooks';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { useFormik, type FormikProps } from 'formik';
import {
  createInvoiceSchema,
  type InvoiceCreateFormValues,
} from '@/lib/validations/cost.schema';
import {
  getErrorMessage,
  toastNotification,
  zodToFormikValidate,
} from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import {
  createPurchaseInvoice,
  getListPurchaseInvoice,
} from '@/api/purchase-invoice';
import Loading from '@/components/BaseComponents/Loading';
import { subMonths } from 'date-fns';

type InvoiceCreateFormik = FormikProps<InvoiceCreateFormValues>;

function CostPage() {
  const navigate = useNavigate();
  const { columns } = useCostManager();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [fromDate, setFromDate] = React.useState<Date | undefined>(() =>
    subMonths(new Date(), 1)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    setFromDate(subMonths(new Date(), 1));
  }, []);

  const {
    data: listPurchaseInvoice,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['list-purchase-invoice'],
    queryFn: getListPurchaseInvoice,
  });

  const formikCreate: InvoiceCreateFormik = useFormik<InvoiceCreateFormValues>({
    initialValues: {
      taxCode: '',
      sellerName: '',
      sellerCompanyName: '',
    },
    validate: zodToFormikValidate(
      createInvoiceSchema,
      () => formikCreate.submitCount
    ),
    onSubmit: async (values) => {
      try {
        await createPurchaseInvoice({
          ...values,
          rows: excelData,
        });
        toastNotification('Tạo hàng hóa mới thành công', 'success');
        refetch();
      } catch (error) {
        toastNotification(getErrorMessage(error), 'error');
      } finally {
        setIsOpenCreate(false);
        formikCreate.resetForm();
        setExcelData([]);
      }
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex gap-2 items-center ">
        <Button variant={'outline'} onClick={() => navigate(-1)}>
          {' '}
          <ChevronLeft />
          {`Quay lại`}
        </Button>
        <Button variant={'outline'} onClick={() => setIsOpenCreate(true)}>
          <Plus /> Thêm mới
        </Button>
      </div>
      <div className="flex justify-between py-2 mt-2">
        <div className="flex gap-2 items-center ">
          <div className="flex font-medium text-sm items-center justify-center gap-2">
            Từ ngày
            <div>
              <CalendarBase setDate={setFromDate} date={fromDate} />
            </div>
          </div>
          <div className="flex font-medium text-sm items-center justify-center gap-2">
            Đến ngày
            <div>
              <CalendarBase setDate={setEndDate} date={endDate} />
            </div>
            <Button>
              <FilterIcon />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={'outline'}
            disabled={Object.keys(rowSelection).length == 0}
          >
            <Trash2 /> Xóa
          </Button>
          <Button variant={'outline'}>
            <File /> Xuất file
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <TableData
          columns={columns}
          data={listPurchaseInvoice?.results || []}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
        />
      </div>
      <ConfirmModal
        open={isOpenCreate}
        onOpenChange={setIsOpenCreate}
        title={'Thông tin hóa đơn'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FormGroup
                label="Mã số thuế đơn vị bán hàng"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.taxCode}
              >
                <BaseInput
                  id="taxCode"
                  value={formikCreate.values.taxCode}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(
                      formikCreate.touched.taxCode &&
                      formikCreate.errors.taxCode
                    )
                  }
                />
              </FormGroup>

              <FormGroup
                label="Tên người bán hàng"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.sellerName}
              >
                <BaseInput
                  id="sellerName"
                  value={formikCreate.values.sellerName}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(
                      formikCreate.touched.sellerName &&
                      formikCreate.errors.sellerName
                    )
                  }
                />
              </FormGroup>
            </div>

            <div className="flex items-center gap-2">
              <FormGroup
                label="Tên đơn vị bán hàng"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.sellerCompanyName}
              >
                <BaseInput
                  id="sellerCompanyName"
                  value={formikCreate.values.sellerCompanyName}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(
                      formikCreate.touched.sellerCompanyName &&
                      formikCreate.errors.sellerCompanyName
                    )
                  }
                />
              </FormGroup>
            </div>

            <div>
              <ExcelUploader setData={setExcelData} data={excelData} />
            </div>
          </div>
        }
        handleSubmit={formikCreate.handleSubmit}
        handleCancel={formikCreate.resetForm}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CostPage;
