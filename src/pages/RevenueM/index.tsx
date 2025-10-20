import { CalendarBase } from '@/components/BaseComponents/Calendar';
import ExcelUploader from '@/components/BaseComponents/ExcelUploader';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import type { ExcelData } from '@/types/excelFile';
import { ChevronLeft, File, FilterIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCostManager } from './hooks';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { useFormik, type FormikProps } from 'formik';
import { zodToFormikValidate } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
// import { createPurchaseInvoice } from '@/api/purchase-invoice';
import Loading from '@/components/BaseComponents/Loading';
import { getListSaleInvoice } from '@/api/sale-invoice';
import {
  createInvoiceSaleSchema,
  type InvoiceSaleCreateFormValues,
} from '@/lib/validations/sale.schema';

type InvoiceCreateFormik = FormikProps<InvoiceSaleCreateFormValues>;

function RevenuePage() {
  const navigate = useNavigate();
  const { columns } = useCostManager();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [excelData, setExcelData] = useState<ExcelData[]>([]);

  const {
    data: listSaleInvoice,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ['list-sale-invoice'],
    queryFn: getListSaleInvoice,
  });

  const formikCreate: InvoiceCreateFormik =
    useFormik<InvoiceSaleCreateFormValues>({
      initialValues: {
        taxCode: '',
        customerName: '',
        customerCompanyName: '',
      },
      validate: zodToFormikValidate(
        createInvoiceSaleSchema,
        () => formikCreate.submitCount
      ),
      onSubmit: async () => {
        // try {
        // await createPurchaseInvoice({
        //   ...values,
        //   rows: excelData,
        // });
        // toastNotification('Tạo hóa đơn mới thành công', 'success');
        // formikCreate.resetForm();
        //   refetch();
        // } catch (error) {
        //   if (error instanceof Error) toastNotification(error.message, 'error');
        // }
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
              <CalendarBase setDate={setStartDate} date={startDate} />
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
          <Button variant={'outline'}>
            <Trash2 /> Xóa
          </Button>
          <Button variant={'outline'}>
            <File /> Xuất file
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <TableData columns={columns} data={listSaleInvoice?.results || []} />
      </div>
      <ConfirmModal
        open={isOpenCreate}
        onOpenChange={setIsOpenCreate}
        title={'Thông tin hóa đơn'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FormGroup
                label="Mã số thuế đơn vị mua hàng"
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
                label="Tên người mua hàng"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.customerName}
              >
                <BaseInput
                  id="customerName"
                  value={formikCreate.values.customerName}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(
                      formikCreate.touched.customerName &&
                      formikCreate.errors.customerName
                    )
                  }
                />
              </FormGroup>
            </div>

            <div className="flex items-center gap-2">
              <FormGroup
                label="Tên đơn vị mua hàng"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.customerCompanyName}
              >
                <BaseInput
                  id="customerCompanyName"
                  value={formikCreate.values.customerCompanyName}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(
                      formikCreate.touched.customerCompanyName &&
                      formikCreate.errors.customerCompanyName
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
    </div>
  );
}

export default RevenuePage;
