import { getBhhById } from '@/api/bussiness-household';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function SingleBusinessHousehold() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['bhh-by-id', id],
    queryFn: () => getBhhById(id || ''),
  });
  return <div>{data?.name}</div>;
}

export default SingleBusinessHousehold;
