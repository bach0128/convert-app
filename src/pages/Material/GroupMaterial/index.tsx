import { TableData } from '@/components/BaseComponents/TableData';
import { useGroupColumns } from './hooks';
import { useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { mockGroupMaterial } from '@/mocks/GroupMaterial';
import SearchInput from '@/components/BaseComponents/SearchInput';
import { useQuery } from '@tanstack/react-query';
import { getMaterialGroup } from '@/api/material';
import Loading from '@/components/BaseComponents/Loading';
import { Button } from '@/components/Shadcn/button';
import { Plus } from 'lucide-react';

function GroupMaterial() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: listMg,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ['list-material-group'],
    queryFn: getMaterialGroup,
  });

  const { columns } = useGroupColumns(setIdEdit, setIsEditing);

  const dataEditing = useMemo(() => {
    if (idEdit)
      return mockGroupMaterial.filter((item) => item.id === idEdit)[0];
  }, [idEdit]);

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Tìm kiếm" />
        <div className="flex gap-2">
          <Button variant={'outline'}>
            <Plus /> Thêm mới{' '}
          </Button>
        </div>
      </div>
      {listMg?.results && (
        <div className="mt-4">
          <TableData columns={columns} data={listMg?.results} />
        </div>
      )}

      <ConfirmModal
        open={Boolean(isEditing)}
        onOpenChange={setIsEditing}
        title={'Thông tin nhóm hàng hóa và dịch vụ'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <FormGroup label="Mã">
                <BaseInput isReadonly={true} value={dataEditing?.code} />
              </FormGroup>
              <FormGroup label="Tỷ lệ thuế GTGT">
                <BaseInput isReadonly={true} value={dataEditing?.vat_rate} />
              </FormGroup>
              <FormGroup label="Tỷ lệ thuế TNCN">
                <BaseInput isReadonly={true} value={dataEditing?.pit_rate} />
              </FormGroup>
            </div>
            <div className="flex items-center gap-3 w-full">
              <FormGroup label="Nhóm HH&DV" isRequrired wrapperClass="w-full">
                <BaseInput defaultValue={dataEditing?.name} />
              </FormGroup>
              <FormGroup
                label="Trạng thái sử dụng"
                wrapperClass="w-full"
                isRequrired
              >
                <BaseInput defaultValue={dataEditing?.status} />
              </FormGroup>
            </div>
            <FormGroup label="Loại ngành nghề" isRequrired>
              <BaseInput defaultValue={dataEditing?.type} />
            </FormGroup>
          </div>
        }
        handleSubmit={async () => {}}
        confirmText="Lưu"
        handleCancel={() => {
          setIdEdit('');
          setIsEditing(false);
        }}
      />
    </div>
  );
}

export default GroupMaterial;
