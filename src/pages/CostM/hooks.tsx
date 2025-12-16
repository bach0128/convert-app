// import Status from '@/components/BaseComponents/Status';
import { ROUTE_PATH } from '@/enum/route-path';
import { formatNumber } from '@/lib/utils';
import type { PurchaseInvoiceDto } from '@/types/dto/cost-manager';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
// import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const useCostManager = () => {
  const columns: ColumnDef<PurchaseInvoiceDto>[] = [
    {
      accessorKey: 'so_hd',
      header: 'Số hóa đơn',
      cell: (row) => (
        <Link
          to={`${ROUTE_PATH.COST}/${row.getValue()}`}
          className="font-medium text-left text-blue-600 underline"
        >
          {row.getValue<string>()}
        </Link>
      ),
      size: 10,
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
      size: 20,
    },
    {
      accessorKey: 'seller_taxcode',
      header: 'Mã số thuế',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 20,
    },
    {
      accessorKey: 'seller_name',
      header: 'Tên đơn vị bán hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 10,
    },

    {
      accessorKey: 'total_amount_raw',
      header: 'Tổng tiền hàng',
      cell: (row) => {
        const formatted = formatNumber(row.getValue<number>());
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
