import type { PurchaseInvoiceItem } from '@/types/dto/cost-manager';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Shadcn/tooltip';
import { formatNumber } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';
import { getMaterial } from '@/api/material';
import { useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';

export const useSingleCost = (handleRemoveItem: (STT: number) => void) => {
  const { data: listMaterial, isLoading } = useQuery({
    queryKey: ['list-material'],
    queryFn: async () => await getMaterial(),
  });
  const columns: ColumnDef<PurchaseInvoiceItem>[] = [
    {
      accessorKey: 'STT',
      header: 'STT',
      size: 80,
    },
    {
      accessorKey: 'materialUnitId',
      header: 'Tên HH',
      cell: ({ row, table }) => (
        <Select
          value={row.getValue<string>('materialUnitId')}
          onValueChange={(val) => {
            if (row.getIsSelected()) {
              table.options.meta?.applyValueToSelectedRows(
                'materialUnitId',
                val
              );
            } else {
              table.options.meta?.updateData(row.index, 'materialUnitId', val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn tên HH" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              'Loading'
            ) : (
              <>
                {listMaterial?.results.map((i) => {
                  return (
                    <SelectItem key={i.id} value={i.id}>
                      {i.name}
                    </SelectItem>
                  );
                })}
              </>
            )}
          </SelectContent>
        </Select>
      ),
      size: 300,
    },
    {
      accessorKey: 'THHDVu',
      header: 'Tên SP',
      meta: { editable: true },
      size: 300,
    },
    {
      accessorKey: 'DGia',
      header: 'Đơn giá',
      meta: { editable: true },
      cell: (row) => {
        const formatted = formatNumber(row.getValue<number>());
        return <span>{formatted}</span>;
      },
      size: 200,
    },
    {
      accessorKey: 'SLuong',
      header: 'Số lượng',
      meta: { editable: true },
      size: 150,
    },
    {
      accessorKey: 'DVTinh',
      header: 'Đơn vị tính',
      meta: { editable: true },
      size: 120,
    },
    {
      accessorKey: 'ThTien',
      header: 'Thành tiền',
      cell: (row) => {
        const formatted = formatNumber(row.getValue<number>());
        return <span>{formatted}</span>;
      },
      size: 150,
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const STT = row.original.STT;
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Trash2
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  handleRemoveItem(STT);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Xóa</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
  ];

  return {
    columns,
  };
};
