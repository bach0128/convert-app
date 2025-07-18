import { Button } from '@/components/Shadcn/button';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  name: string;
};

export const useMineBusiness = () => {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="p-0 px-1"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-left">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div className="capitalize">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : status === 'processing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="p-0"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
  ];

  return {
    columns,
  };
};
