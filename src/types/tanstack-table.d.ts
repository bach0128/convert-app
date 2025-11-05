/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table';
import type { RowData } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    editable?: boolean;
    // updateData?: (
    //   rowIndex: number,
    //   columnId: string,
    //   value: string | number
    // ) => void;
  }

  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
