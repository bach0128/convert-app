import { getSaleInvoice, updateSaleInvoice } from '@/api/sale-invoice';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import { TableEditData } from '@/components/BaseComponents/TableEditData';
import { Button } from '@/components/Shadcn/button';
import {
  getErrorMessage,
  toastNotification,
  zodToFormikValidate,
} from '@/lib/utils';
import {
  editInvoiceSaleSchema,
  type InvoiceSaleEditFormValues,
} from '@/lib/validations/sale.schema';
import type { SaleInvoiceItem } from '@/types/dto/sale-manager';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useFormik, type FormikProps } from 'formik';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';

type InvoicePurchaseEditFormik = FormikProps<InvoiceSaleEditFormValues>;

function SingleSaleInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: saleInvoice,
    isLoading,
    refetch,
  } = useQuery({
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
      onSubmit: async (values) => {
        try {
          await updateSaleInvoice(id || '', {
            ...values,
            rows: items.map((item) => {
              const unitPrice = +item.unitPrice;
              const totalPrice = +item.unitPrice;
              return {
                ...item,
                unitPrice,
                totalPrice,
              };
            }),
          });
          toastNotification('Cập nhật hóa đơn thành công', 'success');
          refetch();
        } catch (error) {
          toastNotification(getErrorMessage(error), 'error');
        } finally {
          setIsEditing(false);
        }
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
    // eslint-disable-next-line
  }, [saleInvoice]);

  // setup render table list item in invoice
  const [items, setItems] = React.useState<SaleInvoiceItem[]>([]);
  const columns: ColumnDef<SaleInvoiceItem>[] = [
    {
      accessorKey: 'productCode',
      header: 'Mã SP',
      size: 20,
    },
    {
      accessorKey: 'productName',
      header: 'Tên SP',
      size: 20,
    },
    {
      accessorKey: 'materialGroup',
      header: 'Nhóm vật tư',
      size: 20,
    },
    {
      accessorKey: 'quantity',
      header: 'Số lượng',
      meta: { editable: true },
      size: 5,
    },
    {
      accessorKey: 'unitPrice',
      header: 'Đơn giá',
      meta: { editable: true },
      size: 20,
    },
    {
      accessorKey: 'totalPrice',
      header: 'Thành tiền',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        const unitPrice = row.original.unitPrice;
        return (quantity * unitPrice).toLocaleString('vi-VN');
      },
      size: 20,
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const code = row.original.productCode;
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Trash2
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  const updated = items.filter(
                    (item) => item.productCode !== code
                  );
                  setItems(updated);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Xóa</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
  ];

  const handleAddRow = () => {
    const newRow: SaleInvoiceItem = {
      id: Math.random(),
      productCode: '',
      productName: '',
      materialGroup: '',
      unitPrice: 0,
      quantity: 0,
      totalPrice: 0,
    };
    const updated = [...items, newRow];
    setItems(updated);
    // onChange?.(updated);
  };

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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
          <Button onClick={handleAddRow}>Thêm sản phẩm</Button>
        </div>
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
