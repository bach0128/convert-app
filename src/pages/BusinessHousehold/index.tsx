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
import BussinessHeader from './BussinessHeader';
import { useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
// import { useFormik } from 'formik';
// import { zodToFormikValidate } from '@/lib/utils';

function BusinessHousehold() {
  const { id } = useParams();
  const { columns } = useBusinessHousehold();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  // const formik = useFormik<SigninFormValues>({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validate: zodToFormikValidate(signinSchema),
  //   onSubmit: async (values) => {
  //     await signin(values);
  //   },
  // });

  return (
    <div>
      <BussinessHeader setIsOpenCreate={setIsOpenCreate} />
      {!id && (
        <>
          <div className="flex items-center justify-between mt-2">
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
      {/**TODO: add role admin for show this */}
      <ConfirmModal
        open={isOpenCreate}
        onOpenChange={setIsOpenCreate}
        title={'Tạo hộ kinh doanh mới'}
        content={
          <div>
            <FormGroup label="Mã số thuế">
              <BaseInput />
            </FormGroup>
          </div>
        }
        handleSubmit={function (): Promise<void> {
          throw new Error('Function not implemented.');
        }}
        confirmText="Tạo mới"
      />
    </div>
  );
}

export default BusinessHousehold;
