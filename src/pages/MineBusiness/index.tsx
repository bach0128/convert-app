import SearchInput from '@/components/BaseComponents/SearchInput';
import { TableData } from '@/components/BaseComponents/TableData';
import { Button } from '@/components/Shadcn/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';
import { useMineBusiness, type Payment } from './hooks';

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@example.com',
    name: 'Ken Thompson',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'abe45@example.com',
    name: 'Abe Lincoln',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'monserrat44@example.com',
    name: 'Monserrat Davis',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'silas22@example.com',
    name: 'Silas Johnson',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@example.com',
    name: 'Carmella Rodriguez',
  },
  {
    id: 'xk8s9d2f',
    amount: 459,
    status: 'pending',
    email: 'john.doe@example.com',
    name: 'John Doe',
  },
  {
    id: 'p9l3m4n5',
    amount: 623,
    status: 'processing',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
  },
  {
    id: 'q7w8e9r0',
    amount: 195,
    status: 'failed',
    email: 'bob.wilson@example.com',
    name: 'Bob Wilson',
  },
];

function MineBusiness() {
  const { columns } = useMineBusiness();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SearchInput placeholder="Tìm kiếm" />
          <div className="flex items-center gap-1.5">
            Phân nhóm HKD:
            <Select>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Chọn phân nhóm hộ kinh doanh" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            Ngành nghề chính:
            <Select>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Chọn ngành nghề chính" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant={'outline'} size={'sm'}>
          Xuất file
        </Button>
      </div>

      <div>
        <TableData columns={columns} data={data} />
      </div>
    </div>
  );
}

export default MineBusiness;
