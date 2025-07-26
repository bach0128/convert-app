import Status from '@/components/BaseComponents/Status';
import { Button } from '@/components/Shadcn/button';
import { ListBusinessHousehold } from '@/mocks/BusinessHousehold';
import { PenIcon, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function BusinessHeader() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = ListBusinessHousehold.filter((item) => item.id === id);
  return (
    <div>
      <div className="flex gap-2 items-center ">
        <Button
          variant={'outline'}
          onClick={() => navigate(-1)}
        >{`< Quay lại`}</Button>
        {id ? (
          <Button variant={'outline'}>
            <PenIcon /> Chỉnh sửa
          </Button>
        ) : (
          <Button variant={'outline'}>
            <Plus /> Thêm HKD
          </Button>
        )}
      </div>
      {id && (
        <div className="mt-2 flex items-center gap-2">
          <p className="inline-flex text-start font-semibold text-gray-400">
            Thông tin hộ kinh doanh{' '}
            <span className="font-semibold text-black">&nbsp;-&nbsp;{id}</span>
          </p>
          <Status status={data[0].status} />
        </div>
      )}
    </div>
  );
}

export default BusinessHeader;
