import { ListBusinessHousehold } from '@/mocks/BusinessHousehold';
import { useParams } from 'react-router-dom';

function SingleBusinessHousehold() {
  const { id } = useParams();
  const data = ListBusinessHousehold.filter((item) => item.id === id);
  return <div>{data[0].business_name}</div>;
}

export default SingleBusinessHousehold;
