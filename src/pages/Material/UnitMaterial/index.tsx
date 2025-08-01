import { TableData } from '@/components/BaseComponents/TableData';
import { useUnitColumns } from './hooks';
import { mockUnits } from '@/mocks/UnitMaterial';
import { useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { format } from 'date-fns';
import SearchInput from '@/components/BaseComponents/SearchInput';

function UnitMaterial() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { columns } = useUnitColumns(setIdEdit, setIsEditing);

  const dataEditing = useMemo(() => {
    if (idEdit) return mockUnits.filter((item) => item.id === idEdit)[0];
  }, [idEdit]);

  return (
    <div className="mt-4">
      <SearchInput placeholder="Tìm kiếm" />
      <div className="mt-4">
        <TableData columns={columns} data={mockUnits} />
      </div>

      <ConfirmModal
        open={Boolean(isEditing)}
        onOpenChange={setIsEditing}
        title={'Chỉnh sửa thông tin đơn vị tính'}
        content={
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FormGroup label="Ngày khởi tạo">
                <BaseInput
                  isReadonly={true}
                  value={format(
                    dataEditing ? new Date(dataEditing.created_at) : Date.now(),
                    'dd/MM/yyyy'
                  )}
                />
              </FormGroup>
              <FormGroup label="Mã đơn vị tính">
                <BaseInput isReadonly={true} value={dataEditing?.code} />
              </FormGroup>
              <FormGroup label="Trạng thái sử dụng" isRequrired>
                <BaseInput defaultValue={dataEditing?.status} />
              </FormGroup>
            </div>
            <FormGroup label="Tên đơn vị tính" isRequrired>
              <BaseInput defaultValue={dataEditing?.name} />
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

export default UnitMaterial;
