import { CalendarBase } from '@/components/BaseComponents/Calendar';
import XmlUploader from '@/components/BaseComponents/XmlUploader';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import { ChevronLeft, File, FilterIcon, Plus, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCostManager } from './hooks';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import { getErrorMessage, getSellerInfo, toastNotification } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import {
  createPurchaseInvoice,
  getListPurchaseInvoice,
} from '@/api/purchase-invoice';
import Loading from '@/components/BaseComponents/Loading';
import { subMonths } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

function CostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { columns } = useCostManager();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [fromDate, setFromDate] = React.useState<Date | undefined>(() =>
    subMonths(new Date(), 1)
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [rawData, setRawData] = useState<string>('');
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

  const { taxCode } = getSellerInfo(rawData);
  const handleCreateInvoice = async () => {
    if (user?.tax_code !== taxCode) {
      try {
        await createPurchaseInvoice({
          rawData,
        });
        toastNotification('Tạo hàng hóa mới thành công', 'success');
        refetch();
      } catch (error) {
        toastNotification(getErrorMessage(error), 'error');
      } finally {
        setIsOpenCreate(false);
        setRawData('');
      }
    } else toastNotification('Vui lòng kiểm tra lại người bán hàng.', 'error');
  };

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
        title={'Hóa đơn mua hàng'}
        content={
          <div>
            <XmlUploader setData={setRawData} data={rawData} />
          </div>
        }
        handleSubmit={handleCreateInvoice}
        handleCancel={() => {
          setIsOpenCreate(false);
          setRawData('');
        }}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CostPage;
