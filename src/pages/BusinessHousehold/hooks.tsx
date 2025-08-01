import Status from '@/components/BaseComponents/Status';
import { Button } from '@/components/Shadcn/button';
import { ROUTE_PATH } from '@/enum/RoutePath';
import type { Status_Business } from '@/enum/Status_Business';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export type BusinessHouseholdItem = {
  id: string;
  tax_code: string;
  business_name: string;
  business_group: string;
  main_industry: string;
  status: Status_Business;
};

export const useBusinessHousehold = () => {
  const columns: ColumnDef<BusinessHouseholdItem>[] = [
    {
      accessorKey: 'tax_code',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Mã số thuế
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (table) => (
        <Link
          to={`${ROUTE_PATH.BUSINESS_HOUSEHOLD}/${table.row.original.id}`}
          className="font-medium text-left text-blue-600 underline"
        >
          {table.row.original.tax_code}
        </Link>
      ),
      size: 10,
    },
    {
      accessorKey: 'business_name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Tên hộ kinh doanh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue('business_name')}</span>,
      size: 33.33,
    },
    {
      accessorKey: 'business_group',
      header: 'Phân nhóm',
      cell: ({ row }) => <span>{row.getValue('business_group')}</span>,
      size: 20,
    },
    {
      accessorKey: 'main_industry',
      header: 'Ngành nghề chính',
      cell: ({ row }) => <span>{row.getValue('main_industry')}</span>,
      size: 20,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: ({ row }) => {
        const status = row.getValue('status') as Status_Business;

        return <Status status={status} />;
      },
      size: 10,
    },
  ];

  return {
    columns,
  };
};
