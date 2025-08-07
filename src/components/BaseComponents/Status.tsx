import type { Status_Business } from '@/enum/status-bussiness';
import { cn } from '@/lib/utils';

function Status({
  status,
  wrapperClass,
}: {
  status: Status_Business;
  wrapperClass?: string;
}) {
  const statusStyle = {
    active: 'bg-green-200 text-green-800',
    'Temporarily suspended': 'bg-yellow-200 text-yellow-800',
    stop: 'bg-red-200 text-red-800',
    new: 'bg-gray-200 text-gray-800',
  };

  const statusTitle = {
    active: 'Đang hoạt động',
    stop: 'Ngưng hoạy động',
    new: 'tạo mới',
  };
  return (
    <span
      className={cn(
        `inline-flex items-center justify-center px-2.5 py-2 w-[200px] rounded-lg text-xs font-medium`,
        statusStyle[status] ?? 'bg-gray-200 text-gray-800',
        wrapperClass
      )}
    >
      {statusTitle[status]}
    </span>
  );
}

export default Status;
