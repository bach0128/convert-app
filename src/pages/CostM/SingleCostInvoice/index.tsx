import {
  getPurchaseInvoice,
  updatePurchaseInvoice,
} from '@/api/purchase-invoice';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import { TableEditData } from '@/components/BaseComponents/TableEditData';
import { Button } from '@/components/Shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';
import {
  getErrorMessage,
  toastNotification,
  zodToFormikValidate,
} from '@/lib/utils';
import {
  editInvoicePurchaseSchema,
  type InvoiceEditPurchaseFormValues,
} from '@/lib/validations/cost.schema';
import type { PurchaseInvoiceItem } from '@/types/dto/cost-manager';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { useFormik, type FormikProps } from 'formik';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type InvoicePurchaseEditFormik = FormikProps<InvoiceEditPurchaseFormValues>;

function SingleCostInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: purchaseInvoice,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['purchase-invoice'],
    queryFn: () => getPurchaseInvoice(id || ''),
    enabled: Boolean(id),
  });

  const [isEditing, setIsEditing] = useState(false);

  const formikEdit: InvoicePurchaseEditFormik =
    useFormik<InvoiceEditPurchaseFormValues>({
      initialValues: {
        taxCode: '',
        sellerName: '',
        sellerCompanyName: '',
      },
      validate: zodToFormikValidate(
        editInvoicePurchaseSchema,
        () => formikEdit.submitCount
      ),
      onSubmit: async (values) => {
        try {
          await updatePurchaseInvoice(id || '', {
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
    if (purchaseInvoice) {
      formikEdit.setValues({
        taxCode: purchaseInvoice?.sellerTaxCode || '',
        sellerName: purchaseInvoice?.sellerName || '',
        sellerCompanyName: purchaseInvoice?.sellerCompanyName || '',
      });
      setItems(purchaseInvoice.items);
    }
    // eslint-disable-next-line
  }, [purchaseInvoice]);

  // setup render table list item in invoice
  const [items, setItems] = React.useState<PurchaseInvoiceItem[]>([]);

  const columns: ColumnDef<PurchaseInvoiceItem>[] = [
    {
      accessorKey: 'productCode',
      header: 'Mã SP',
      meta: { editable: true },
      size: 15,
    },
    {
      accessorKey: 'productName',
      header: 'Tên SP',
      meta: { editable: true },
      size: 30,
    },
    {
      accessorKey: 'materialGroup',
      header: 'Nhóm vật tư',
      meta: { editable: true },
      size: 15,
    },
    {
      accessorKey: 'unitPrice',
      header: 'Đơn giá',
      meta: { editable: true },
      size: 20,
    },
    {
      accessorKey: 'quantity',
      header: 'Số lượng',
      meta: { editable: true },
      size: 5,
    },
    {
      accessorKey: 'totalPrice',
      header: 'Thành tiền',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        const unitPrice = row.original.unitPrice;
        return quantity * unitPrice;
      },
      size: 10,
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
    const newRow: PurchaseInvoiceItem = {
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
            value={formikEdit.values.taxCode.trim()}
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
          errorMsg={formikEdit.errors.sellerName}
        >
          <BaseInput
            id="sellerName"
            value={formikEdit.values.sellerName}
            onChange={formikEdit.handleChange}
            isError={
              !!(formikEdit.touched.sellerName && formikEdit.errors.sellerName)
            }
            isReadonly={!isEditing}
          />
        </FormGroup>
        <FormGroup
          label="Tên đơn vị bán hàng"
          isRequrired
          wrapperClass="w-full text-start"
          errorMsg={formikEdit.errors.sellerCompanyName}
        >
          <BaseInput
            id="sellerCompanyName"
            value={formikEdit.values.sellerCompanyName}
            onChange={formikEdit.handleChange}
            isError={
              !!(
                formikEdit.touched.sellerCompanyName &&
                formikEdit.errors.sellerCompanyName
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

      {isEditing && (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant={'default'}
            type="submit"
            onClick={() => formikEdit.submitForm()}
          >
            Lưu
          </Button>
          <Button
            variant={'default'}
            onClick={() => {
              setIsEditing(false);
              formikEdit.setValues({
                taxCode: purchaseInvoice?.sellerTaxCode || '',
                sellerName: purchaseInvoice?.sellerName || '',
                sellerCompanyName: purchaseInvoice?.sellerCompanyName || '',
              });
              setItems(purchaseInvoice?.items || []);
            }}
          >
            Hủy
          </Button>
        </div>
      )}
    </div>
  );
}

export default SingleCostInvoice;
