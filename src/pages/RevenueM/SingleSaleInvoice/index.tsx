import { getSaleInvoice, updateSaleInvoice } from '@/api/sale-invoice';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import { TableEditData } from '@/components/BaseComponents/TableEditData';
import { Button } from '@/components/Shadcn/button';
import type { SaleInvoiceItem } from '@/types/dto/sale-manager';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Edit } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleSale } from './hooks';
import { InvoiceItemType } from '@/models/invoice';
import { getErrorMessage, toastNotification } from '@/lib/utils';

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

  const [rowSelection, setRowSelection] = React.useState({});
  const [isEditing, setIsEditing] = useState(false);

  // setup render table list item in invoice
  const [items, setItems] = React.useState<SaleInvoiceItem[]>([]);

  const handleRemoveItem = (STT: number) => {
    setItems(
      items.map((i) => {
        if (i.STT === STT) {
          return { ...i, is_removed: true };
        } else return i;
      })
    );
  };
  const { columns } = useSingleSale(handleRemoveItem);

  const handleAddRow = () => {
    const newRow: SaleInvoiceItem = {
      STT: Math.random(),
      THHDVu: '',
      materialUnitId: '',
      source: InvoiceItemType.MANUAL,
      DGia: 0,
      SLuong: 0,
      ThTien: 0,
      DVTinh: '',
    };
    const updated = [...items, newRow];
    setItems(updated);
    // onChange?.(updated);
  };

  const handleUpdateInvoice = async () => {
    try {
      await updateSaleInvoice(id || '', items);
      toastNotification('Cập nhật hóa đơn thành công', 'success');
      refetch();
    } catch (error) {
      toastNotification(getErrorMessage(error), 'error');
    }
  };

  useEffect(() => {
    if (!saleInvoice) return;

    if (saleInvoice.has_adjustment) {
      setItems(
        saleInvoice.items_adjusted
          .map((i) => ({
            ...i,
          }))
          .filter((i) => i.is_removed !== true)
      );
    } else
      setItems(
        saleInvoice.items_raw
          .map((i, index) => ({
            ...i,
            source: InvoiceItemType.XML,
            original_index: index,
          }))
          .filter((i) => i.is_removed !== true)
      );
  }, [saleInvoice]);

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
          wrapperClass="w-full text-start"
        >
          <BaseInput
            id="taxCode"
            value={saleInvoice?.seller_taxcode}
            isReadonly
          />
        </FormGroup>
        <FormGroup label="Tên người bán hàng" wrapperClass="w-full text-start">
          <BaseInput
            id="sellerName"
            value={saleInvoice?.seller_name}
            isReadonly
          />
        </FormGroup>
        <FormGroup label="Tên đơn vị bán hàng" wrapperClass="w-full text-start">
          <BaseInput
            id="sellerCompanyName"
            value={saleInvoice?.seller_address}
            isReadonly
          />
        </FormGroup>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => setRowSelection({})}>Bỏ chọn tất cả</Button>
            <Button onClick={handleAddRow}>Thêm sản phẩm</Button>
          </div>
        </div>
        <TableEditData
          data={items.filter((i) => i.is_removed !== true)}
          columns={columns}
          onChange={setItems}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
        />
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button variant={'default'} onClick={() => handleUpdateInvoice()}>
          Lưu
        </Button>
        <Button
          variant={'default'}
          onClick={() => {
            setIsEditing(false);
            setItems(
              saleInvoice?.has_adjustment
                ? saleInvoice.items_adjusted
                : saleInvoice?.items_raw || []
            );
          }}
        >
          Hủy
        </Button>
      </div>
    </div>
  );
}

export default SingleSaleInvoice;
