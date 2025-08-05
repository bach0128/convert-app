import type { Status_Business } from '@/interfaces/Status_Business';
import { cn } from '@/lib/utils';

function Status({
  status,
  wrapperClass,
}: {
  status: Status_Business;
  wrapperClass?: string;
}) {
  const statusStyle = {
    Active: 'bg-green-200 text-green-800',
    'Temporarily suspended': 'bg-yellow-200 text-yellow-800',
    Closed: 'bg-red-200 text-red-800',
    Inactive: 'bg-gray-200 text-gray-800',
  };
  return (
    <span
      className={cn(
        `inline-flex items-center justify-center px-2.5 py-2 w-[200px] rounded-lg text-xs font-medium`,
        statusStyle[status] ?? 'bg-gray-200 text-gray-800',
        wrapperClass
      )}
    >
      {status}
    </span>
  );
}

export default Status;
