import * as React from 'react';
import {
  type ColumnDef,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/table';
import { IndeterminateCheckbox } from '@/types/table';
import { v4 as uuidv4 } from 'uuid';

type EditableTableProps<T extends { STT: string | number }> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  onChange?: (updatedData: T[]) => void;

  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
};

export function TableEditData<T extends { STT: string | number }>({
  data,
  columns,
  onChange,
  rowSelection,
  setRowSelection,
}: EditableTableProps<T>) {
  const [tableData, setTableData] = React.useState<T[]>(data);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const updateData = (rowIndex: number, columnId: keyof T, value: unknown) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [columnId]: value,
      };
      onChange?.(updated);
      return updated;
    });
  };

  const applyValueToSelectedRows = <K extends keyof T>(key: K, value: T[K]) => {
    if (!rowSelection) return;

    const selectedIndexes = table
      .getSelectedRowModel()
      .rows.map((r) => r.index);

    if (!selectedIndexes.length) return;

    setTableData((prev) => {
      const updated = prev.map((row, index) =>
        selectedIndexes.includes(index) ? { ...row, [key]: value } : row
      );
      onChange?.(updated);
      return updated;
    });
  };

  const safeRowSelection = rowSelection ?? {};

  const table = useReactTable({
    defaultColumn: {
      size: 150,
      minSize: 50,
      maxSize: 400,
    },
    data: tableData,
    columns,

    state: { rowSelection: safeRowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    meta: {
      updateData,
      applyValueToSelectedRows,
    },

    debugTable: true,
  });

  return (
    <div className="max-w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {rowSelection && (
                  <TableHead>
                    <IndeterminateCheckbox
                      checked={table.getIsAllRowsSelected()}
                      indeterminate={table.getIsSomeRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                  </TableHead>
                )}

                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id + uuidv4()}
                    style={{
                      width: `${header.column.getSize()}px`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
              <TableRow
                key={row.id}
                data-state={row && row.getIsSelected() ? 'selected' : ''}
              >
                {rowSelection && (
                  <TableCell>
                    <IndeterminateCheckbox
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      indeterminate={row.getIsSomeSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </TableCell>
                )}

                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as {
                    editable?: boolean;
                  };

                  const isEditable = meta?.editable;
                  const value = cell.getValue<string | number>();

                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: `${cell.column.getSize()}px`,
                      }}
                    >
                      {isEditable ? (
                        <input
                          className="w-full px-2 py-1 border rounded text-sm"
                          value={value ?? ''}
                          onChange={(e) =>
                            table.options.meta?.updateData(
                              row.index,
                              cell.column.id as keyof T,
                              e.target.value
                            )
                          }
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
