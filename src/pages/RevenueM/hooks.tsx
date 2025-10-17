// import Status from '@/components/BaseComponents/Status';
import { ROUTE_PATH } from '@/enum/route-path';
import type { SaleInvoiceDto } from '@/types/dto/sale-manager';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
// import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const useCostManager = () => {
  const columns: ColumnDef<SaleInvoiceDto>[] = [
    {
      accessorKey: 'invoiceNumber',
      header: 'Số hóa đơn',
      cell: (row) => (
        <Link
          to={`${ROUTE_PATH.REVENUE}/${row.getValue()}`}
          className="font-medium text-left text-blue-600 underline"
        >
          {row.getValue<string>()}
        </Link>
      ),
      size: 10,
    },
    {
      accessorKey: 'createdAt',
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
      accessorKey: 'sellerTaxCode',
      header: 'Mã số thuế',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 20,
    },
    {
      accessorKey: 'sellerName',
      header: 'Tên người mua hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 10,
    },
    {
      accessorKey: 'sellerCompanyName',
      header: 'Tên đơn vị mua hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
      size: 10,
    },

    {
      accessorKey: 'sellerTaxCode',
      header: 'Tổng tiền hàng',
      cell: (row) => <span>{row.getValue<string>()}</span>,
    },
  ];

  return {
    columns,
  };
};
