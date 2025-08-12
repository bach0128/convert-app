import Status from '@/components/BaseComponents/Status';
import { Button } from '@/components/Shadcn/button';
import type { BusinessHouseholdItem } from '@/types/dto/bussiness-household';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          to={`/business_household_detail/${table.row.original.id}`}
          className="font-medium text-left text-blue-600 underline"
        >
          {table.row.original.tax_code}
        </Link>
      ),
      size: 10,
    },
    {
      accessorKey: 'name',
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
      cell: ({ row }) => <span>{row.getValue('name')}</span>,
      size: 33.33,
    },
    {
      accessorKey: 'industryGroup',
      header: 'Phân nhóm',
      cell: (table) => <span>{table.row.original.industryGroup.name}</span>,
      size: 20,
    },
    {
      accessorKey: 'bussinessType',
      header: 'Ngành nghề chính',
      cell: (table) => <span>{table.row.original.bussinessType.name}</span>,
      size: 20,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái',
      cell: (table) => {
        return <Status status={table.row.original.status.name} />;
      },
      size: 10,
    },
  ];

  return {
    columns,
  };
};
