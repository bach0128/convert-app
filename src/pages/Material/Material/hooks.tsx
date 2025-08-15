import { Button } from '@/components/Shadcn/button';
import { ArrowUpDown, PencilIcon, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import Status from '@/components/BaseComponents/Status';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';
import type { MaterialItem } from '@/types/dto/material';

export const useGroupColumns = (
  setIdEdit: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setDataDelete: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >,
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const columns: ColumnDef<MaterialItem>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Mã
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="w-[120px]">{row.getValue('id')}</span>
      ),
      size: 8.33,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 px-1 hover:bg-transparent cursor-pointer"
        >
          Tên hàng hóa và dịch vụ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="">{row.getValue('name')}</span>,
      size: 16.66,
    },
    {
      accessorKey: 'unit',
      header: () => <span>ĐVT</span>,
      cell: (table) => <span>{table.row.original.unit.name}</span>,
      size: 16.66,
    },
    {
      accessorKey: 'group',
      header: () => <span>Nhóm HH&DV</span>,
      cell: (table) => <span>{table.row.original.group.name}</span>,
      size: 16.66,
    },
    // {
    //   accessorKey: 'provider',
    //   header: () => <span>Nguồn gốc</span>,
    //   cell: ({ row }) => <span className="">{row.getValue('provider')}</span>,
    //   size: 8.33,
    // },
    // {
    //   accessorKey: 'category',
    //   header: () => <span>Phân loại</span>,
    //   cell: ({ row }) => <span className="">{row.getValue('category')}</span>,
    //   size: 16.66,
    // },
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
      size: 16.66,
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
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <PauseCircle size={18} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ngừng hoạt động</p>
              </TooltipContent>
            </Tooltip> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2
                  size={18}
                  className="cursor-pointer"
                  onClick={() => {
                    setDataDelete({
                      name: table.row.original.name,
                      id: table.row.original.id,
                    });
                    setIsDelete(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
      size: 16.66,
    },
  ];

  return { columns };
};
