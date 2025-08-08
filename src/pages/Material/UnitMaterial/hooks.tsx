import { Button } from '@/components/Shadcn/button';
import { ArrowUpDown, PauseCircle, PencilIcon, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Status from '@/components/BaseComponents/Status';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';
import type { MaterialUnitItem } from '@/types/dto/material';

export const useUnitColumns = (
  setIdEdit: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const columns: ColumnDef<MaterialUnitItem>[] = [
    {
      accessorKey: 'id',
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
      cell: ({ row }) => <span>{row.getValue('id')}</span>,
      size: 16.67,
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
      size: 33.33,
    },
    {
      accessorKey: 'createdAt',
      header: 'Ngày khởi tạo',
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as string;
        return <span>{format(new Date(date), 'dd/MM/yyyy')}</span>;
      },
      size: 16.67,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái hoạt động',
      cell: (table) => {
        return (
          <Status
            status={table.row.original.status.name}
            wrapperClass="w-full max-w-[200px]"
          />
        );
      },
      size: 16.67,
    },
    {
      accessorKey: 'action',
      header: 'Tác vụ',
      cell: (table) => {
        return (
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <PencilIcon
                  size={18}
                  className="cursor-pointer"
                  onClick={() => {
                    setIdEdit(table.row.original.id);
                    setIsEditing(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Chỉnh sửa</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <PauseCircle size={18} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ngừng hoạt động</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2 size={18} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
      size: 16.67,
    },
  ];

  return { columns };
};
