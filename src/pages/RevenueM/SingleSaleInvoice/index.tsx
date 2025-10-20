import { getSaleInvoice } from '@/api/sale-invoice';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import { TableEditData } from '@/components/BaseComponents/TableEditData';
import { Button } from '@/components/Shadcn/button';
import { zodToFormikValidate } from '@/lib/utils';
import {
  editInvoiceSaleSchema,
  type InvoiceSaleEditFormValues,
} from '@/lib/validations/sale.schema';
import type { SaleInvoiceItem } from '@/types/dto/sale-manager';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useFormik, type FormikProps } from 'formik';
import { ChevronLeft, Edit } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type InvoicePurchaseEditFormik = FormikProps<InvoiceSaleEditFormValues>;

function SingleSaleInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: saleInvoice, isLoading } = useQuery({
    queryKey: ['sale-invoice'],
    queryFn: () => getSaleInvoice(id || ''),
    enabled: Boolean(id),
  });

  const [isEditing, setIsEditing] = useState(false);

  const formikEdit: InvoicePurchaseEditFormik =
    useFormik<InvoiceSaleEditFormValues>({
      initialValues: {
        taxCode: '',
        customerName: '',
        customerCompanyName: '',
      },
      validate: zodToFormikValidate(
        editInvoiceSaleSchema,
        () => formikEdit.submitCount
      ),
      onSubmit: async (_values) => {
        // try {
        //   await createsaleInvoice({
        //     ...values,
        //     rows: excelData,
        //   });
        //   toastNotification('Tạo hàng hóa mới thành công', 'success');
        //   refetch();
        // } catch (error) {
        //   toastNotification(getErrorMessage(error), 'error');
        // } finally {
        //   setIsOpenCreate(false);
        //   formikCreate.resetForm();
        //   setExcelData([]);
        // }
      },
    });

  useEffect(() => {
    if (saleInvoice) {
      formikEdit.setValues({
        taxCode: saleInvoice?.customerTaxCode || '',
        customerName: saleInvoice?.customerName || '',
        customerCompanyName: saleInvoice?.customerCompanyName || '',
      });
      setItems(saleInvoice.items);
    }
  }, [saleInvoice]);

  // setup render table list item in invoice
  const [items, setItems] = React.useState<SaleInvoiceItem[]>([]);
  const columns: ColumnDef<SaleInvoiceItem>[] = [
    {
      accessorKey: 'productCode',
      header: 'Mã SP',
    },
    {
      accessorKey: 'productName',
      header: 'Tên SP',
    },
    {
      accessorKey: 'materialGroup',
      header: 'Nhóm vật tư',
    },
    {
      accessorKey: 'quantity',
      header: 'Số lượng',
      meta: { editable: true },
    },
    {
      accessorKey: 'unitPrice',
      header: 'Đơn giá',
      meta: { editable: true },
    },
    {
      accessorKey: 'totalPrice',
      header: 'Thành tiền',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        const unitPrice = parseFloat(row.original.unitPrice || '0');
        return (quantity * unitPrice).toLocaleString('vi-VN');
      },
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <Button variant={'outline'} onClick={() => navigate(-1)}>
          {' '}
          <ChevronLeft />
          {`Quay lại`}
        </Button>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit /> Chỉnh sửa
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <FormGroup
          label="Mã số thuế đơn vị bán hàng"
          isRequrired
          wrapperClass="w-full text-start"
          errorMsg={formikEdit.errors.taxCode}
        >
          <BaseInput
            id="taxCode"
            value={formikEdit.values.taxCode}
            onChange={formikEdit.handleChange}
            isError={
              !!(formikEdit.touched.taxCode && formikEdit.errors.taxCode)
            }
            isReadonly={!isEditing}
          />
        </FormGroup>
        <FormGroup
          label="Tên người bán hàng"
          isRequrired
          wrapperClass="w-full text-start"
          errorMsg={formikEdit.errors.customerName}
        >
          <BaseInput
            id="customerName"
            value={formikEdit.values.customerName}
            onChange={formikEdit.handleChange}
            isError={
              !!(
                formikEdit.touched.customerName &&
                formikEdit.errors.customerName
              )
            }
            isReadonly={!isEditing}
          />
        </FormGroup>
        <FormGroup
          label="Tên đơn vị bán hàng"
          isRequrired
          wrapperClass="w-full text-start"
          errorMsg={formikEdit.errors.customerCompanyName}
        >
          <BaseInput
            id="customerCompanyName"
            value={formikEdit.values.customerCompanyName}
            onChange={formikEdit.handleChange}
            isError={
              !!(
                formikEdit.touched.customerCompanyName &&
                formikEdit.errors.customerCompanyName
              )
            }
            isReadonly={!isEditing}
          />
        </FormGroup>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
        <TableEditData data={items} columns={columns} onChange={setItems} />
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button variant={'default'}>Lưu</Button>
        <Button variant={'default'}>Hủy</Button>
      </div>
    </div>
  );
}

export default SingleSaleInvoice;
