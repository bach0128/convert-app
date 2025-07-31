import { Button } from '@/components/Shadcn/button';
import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Status from '@/components/BaseComponents/Status';
import type { Status_Business } from '@/enum/Status_Business';

// Kiểu trạng thái hoạt động
export type UnitStatus = 'active' | 'inactive';

export type UnitItem = {
  id: string;
  code: string;
  name: string;
  created_at: string;
  status: Status_Business;
};

export const useUnitColumns = () => {
  const columns: ColumnDef<UnitItem>[] = [
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Mã ĐVT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue('code')}</span>,
      meta: {
        className: 'w-1/6',
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Tên Đơn vị tính
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="">{row.getValue('name')}</span>,
      size: 500,
    },
    {
      accessorKey: 'created_at',
      header: 'Ngày khởi tạo',
      cell: ({ row }) => {
        const date = row.getValue('created_at') as string;
        return <span>{format(new Date(date), 'dd/MM/yyyy')}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái hoạt động',
      cell: ({ row }) => {
        const status = row.getValue('status') as Status_Business;
        return <Status status={status} wrapperClass="w-full max-w-[200px]" />;
      },
    },
  ];

  return { columns };
};
