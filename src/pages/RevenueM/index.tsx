import { CalendarBase } from '@/components/BaseComponents/Calendar';
import XmlUploader from '@/components/BaseComponents/XmlUploader';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import { ChevronLeft, File, FilterIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRevenueManager } from './hooks';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/BaseComponents/Loading';
import { createSaleInvoice, getListSaleInvoice } from '@/api/sale-invoice';
import { getErrorMessage, getSellerInfo, toastNotification } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

function RevenuePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { columns } = useRevenueManager();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [rawData, setRawData] = useState<string>('');

  const {
    data: listSaleInvoice,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['list-sale-invoice'],
    queryFn: getListSaleInvoice,
  });

  const { taxCode } = getSellerInfo(rawData);
  const handleCreateInvoice = async () => {
    if (user?.tax_code !== taxCode) {
      try {
        await createSaleInvoice({
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
        title={'Hóa đơn bán hàng'}
        content={
          <div className="flex flex-col gap-3">
            <div>
              <XmlUploader setData={setRawData} data={rawData} />
            </div>
          </div>
        }
        handleSubmit={handleCreateInvoice}
        handleCancel={() => {
          setIsOpenCreate(false);
          setRawData('');
        }}
      />
    </div>
  );
}

export default RevenuePage;
