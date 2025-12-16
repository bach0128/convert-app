// import Status from '@/components/BaseComponents/Status';
import { ROUTE_PATH } from '@/enum/route-path';
import type { SaleInvoiceDto } from '@/types/dto/sale-manager';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
// import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const useRevenueManager = () => {
  const columns: ColumnDef<SaleInvoiceDto>[] = [
    {
      accessorKey: 'so_hd',
      header: 'Số hóa đơn',
      cell: (row) => (
        <Link
          to={`${ROUTE_PATH.REVENUE}/${row.getValue()}`}
          className="font-medium text-left text-blue-600 underline"
        >
          {row.getValue<string>()}
        </Link>
      ),
    },
    {
      accessorKey: 'ngay_lap',
      header: 'Ngày tạo hóa đơn',
      cell: (row) => {
        const isoString = row.getValue<string>();
        const date = new Date(isoString);

        const formatted = format(date, 'dd-MM-yyyy');

        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: 'buyer_taxcode',
      header: 'Mã số thuế',
      cell: (row) => <span>{row.getValue<string>()}</span>,
    },
    {
      accessorKey: 'buyer_name',
      header: 'Tên người mua hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
    },
    {
      accessorKey: 'buyer_address',
      header: 'Tên đơn vị mua hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 10,
    },
    {
      accessorKey: 'total_amount_raw',
      header: 'Tổng tiền hàng',
      cell: (row) => {
        const formatted = new Intl.NumberFormat('vi-VN').format(
          row.getValue<number>()
        );
        return <span>{formatted}</span>;
      },
    },
    {
      accessorKey: 'tien_te',
      header: 'Đơn vị tính',
      cell: (row) => <span>{row.getValue<string>()}</span>,
    },
  ];

  return {
    columns,
  };
};
