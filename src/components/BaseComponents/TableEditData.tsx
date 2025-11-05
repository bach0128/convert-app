'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/table';

type EditableTableProps<T extends { id: string | number }> = {
  data: T[];
  columns: ColumnDef<T, string | number>[];
  onChange?: (updatedData: T[]) => void;
};

export function TableEditData<T extends { id: string | number }>({
  data,
  columns,
  onChange,
}: EditableTableProps<T>) {
  const [tableData, setTableData] = React.useState<T[]>(data);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const updateCell = (
    rowIndex: number,
    columnId: string,
    value: string | number
  ) => {
    const updated = [...tableData];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [columnId]: value,
    };
    setTableData(updated);
    onChange?.(updated);
  };

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <div className="max-w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.column.getSize()}%` }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const columnMeta = cell.column.columnDef.meta as {
                    editable?: boolean;
                  };

                  const isEditable = columnMeta?.editable;
                  const value = cell.getValue<string | number>();

                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}%` }}
                    >
                      {isEditable ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            updateCell(
                              row.index,
                              cell.column.id,
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
