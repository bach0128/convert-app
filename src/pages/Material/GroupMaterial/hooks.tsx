import { Button } from '@/components/Shadcn/button';
import { ArrowUpDown, PauseCircle, PencilIcon, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import Status from '@/components/BaseComponents/Status';
import type { Status_Business } from '@/enum/status-bussiness';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';

export type GroupMaterialItem = {
  id: string;
  code: string;
  name: string;
  type: string;
  vat_rate: string;
  pit_rate: string;
  status: Status_Business;
};

export const useGroupColumns = (
  setIdEdit: React.Dispatch<React.SetStateAction<string>>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const columns: ColumnDef<GroupMaterialItem>[] = [
    {
      accessorKey: 'code',
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
        <span className="w-[120px]">{row.getValue('code')}</span>
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
          Tên nhóm hàng hóa và dịch vụ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="">{row.getValue('name')}</span>,
      size: 16.66,
    },
    {
      accessorKey: 'type',
      header: () => <span>Loại ngành nghề</span>,
      cell: ({ row }) => <span>{row.getValue('type')}</span>,
      size: 40,
    },
    {
      accessorKey: 'vat_rate',
      header: () => <span>Tỷ lệ thuế GTGT</span>,
      cell: ({ row }) => <span className="">{row.getValue('vat_rate')}</span>,
      size: 8.33,
    },
    {
      accessorKey: 'pit_rate',
      header: () => <span>Tỷ lệ thuế TNCN</span>,
      cell: ({ row }) => <span className="">{row.getValue('pit_rate')}</span>,
      size: 16.66,
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái hoạt động',
      cell: ({ row }) => {
        const status = row.getValue('status') as Status_Business;
        return <Status status={status} wrapperClass="w-full max-w-[200px]" />;
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
      size: 16.66,
    },
  ];

  return { columns };
};
