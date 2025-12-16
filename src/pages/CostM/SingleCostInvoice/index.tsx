import {
  getPurchaseInvoice,
  updatePurchaseInvoice,
} from '@/api/purchase-invoice';
import BaseInput from '@/components/BaseComponents/BaseInput';
import FormGroup from '@/components/BaseComponents/FormGroup';
import Loading from '@/components/BaseComponents/Loading';
import { TableEditData } from '@/components/BaseComponents/TableEditData';
import { Button } from '@/components/Shadcn/button';

import type { PurchaseInvoiceItem } from '@/types/dto/cost-manager';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Edit } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleCost } from './hooks';
import { InvoiceItemType } from '@/models/invoice';
import { getErrorMessage, toastNotification } from '@/lib/utils';

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
  const [rowSelection, setRowSelection] = React.useState({});
  const [items, setItems] = React.useState<PurchaseInvoiceItem[]>([]);

  const handleRemoveItem = (STT: number) => {
    setItems(
      items.map((i) => {
        if (i.STT === STT) {
          return { ...i, is_removed: true };
        } else return i;
      })
    );
  };

  const { columns } = useSingleCost(handleRemoveItem);

  const handleAddRow = () => {
    const newRow: PurchaseInvoiceItem = {
      STT: items.length + 1,
      THHDVu: '',
      DVTinh: '',
      materialUnitId: '',
      source: InvoiceItemType.MANUAL,
      DGia: 0,
      SLuong: 0,
      ThTien: 0,
    };
    const updated = [...items, newRow];
    setItems(updated);
    // onChange?.(updated);
  };
  const handleUpdateInvoice = async () => {
    try {
      await updatePurchaseInvoice(id || '', items);
      toastNotification('Cập nhật hóa đơn thành công', 'success');
      refetch();
    } catch (error) {
      toastNotification(getErrorMessage(error), 'error');
    }
  };

  useEffect(() => {
    if (!purchaseInvoice) return;

    if (purchaseInvoice.has_adjustment) {
      setItems(
        purchaseInvoice.items_adjusted
          .map((i) => ({
            ...i,
          }))
          .filter((i) => i.is_removed !== true)
      );
    } else
      setItems(
        purchaseInvoice.items_raw
          .map((i, index) => ({
            ...i,
            source: InvoiceItemType.XML,
            original_index: index,
          }))
          .filter((i) => i.is_removed !== true)
      );
  }, [purchaseInvoice]);

  // is_removed;

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
            value={purchaseInvoice?.seller_taxcode}
            isReadonly
          />
        </FormGroup>
        <FormGroup label="Tên người bán hàng" wrapperClass="w-full text-start">
          <BaseInput
            id="sellerName"
            value={purchaseInvoice?.seller_name}
            isReadonly
          />
        </FormGroup>
        <FormGroup label="Tên đơn vị bán hàng" wrapperClass="w-full text-start">
          <BaseInput
            id="sellerCompanyName"
            value={purchaseInvoice?.seller_address}
            isReadonly
          />
        </FormGroup>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
          <Button onClick={handleAddRow}>Thêm sản phẩm</Button>
        </div>
        <TableEditData
          data={items.filter((i) => i.is_removed !== true)}
          columns={columns}
          onChange={setItems}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
        />
      </div>

      {isEditing && (
        <div className="flex justify-end items-center gap-2">
          <Button variant={'default'} onClick={() => handleUpdateInvoice()}>
            Lưu
          </Button>
          <Button
            variant={'default'}
            onClick={() => {
              setIsEditing(false);
              setItems(
                purchaseInvoice?.has_adjustment
                  ? purchaseInvoice.items_adjusted
                  : purchaseInvoice?.items_raw || []
              );
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
