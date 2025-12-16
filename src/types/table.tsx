import { cn } from '@/lib/utils';
import type { HTMLProps } from 'react';
import React from 'react';

// src: tanstack table - row selection : https://github.com/TanStack/table/blob/main/examples/react/row-selection/src/main.tsx#L340
export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn('cursor-pointer', className)}
      {...rest}
    />
  );
}
