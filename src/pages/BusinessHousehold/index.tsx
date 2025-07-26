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
import { useBusinessHousehold } from './hooks';
import { ListBusinessHousehold } from '@/mocks/BusinessHousehold';
import { useParams } from 'react-router-dom';
import BusinessHeader from './header';

function BusinessHousehold() {
  const { id } = useParams();
  const { columns } = useBusinessHousehold();
  return (
    <div>
      <BusinessHeader />
      {!id && (
        <>
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

          <div className="mt-4">
            <TableData columns={columns} data={ListBusinessHousehold} />
          </div>
        </>
      )}
    </div>
  );
}

export default BusinessHousehold;
