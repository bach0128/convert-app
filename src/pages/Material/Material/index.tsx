import { TableData } from '@/components/BaseComponents/TableData';
import { useGroupColumns } from './hooks';
import { useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import SearchInput from '@/components/BaseComponents/SearchInput';
import { mockMaterial } from '@/mocks/Material';

function Material() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { columns } = useGroupColumns(setIdEdit, setIsEditing);

  const dataEditing = useMemo(() => {
    if (idEdit) return mockMaterial.filter((item) => item.id === idEdit)[0];
  }, [idEdit]);

  return (
    <div>
      <SearchInput placeholder="Tìm kiếm" />
      <div className="mt-4">
        <TableData columns={columns} data={mockMaterial} />
      </div>

      <ConfirmModal
        open={Boolean(isEditing)}
        onOpenChange={setIsEditing}
        title={'Thông tin hàng hóa và dịch vụ'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <FormGroup label="Mã">
                <BaseInput isReadonly={true} value={dataEditing?.code} />
              </FormGroup>
              <FormGroup label="Tên HHDV" isRequrired>
                <BaseInput value={dataEditing?.name} />
              </FormGroup>
              <FormGroup label="Nhóm HHDV" isRequrired>
                <BaseInput value={dataEditing?.type} />
              </FormGroup>
              <FormGroup label="Loại" isRequrired>
                <BaseInput value={dataEditing?.category} />
              </FormGroup>
            </div>
            <div className="flex items-center gap-3 w-full">
              <FormGroup label="ĐVT" isRequrired>
                <BaseInput defaultValue={dataEditing?.unit_name} />
              </FormGroup>
              <FormGroup label="Nguồn gốc" isRequrired>
                <BaseInput defaultValue={dataEditing?.provider} />
              </FormGroup>
              <FormGroup label="Giá bán ra" isRequrired>
                <BaseInput defaultValue={dataEditing?.price} />
              </FormGroup>
              <FormGroup label="Chiết khấu">
                <BaseInput defaultValue={dataEditing?.discount || 0} />
              </FormGroup>
            </div>
            <div className="flex items-center gap-3 w-full">
              <FormGroup
                label="Giảm thuế giá trị gia tăng"
                wrapperClass="w-full"
                isRequrired
              >
                <BaseInput />
              </FormGroup>
              <FormGroup
                label="Trạng thái sử dụng"
                wrapperClass="w-full"
                isRequrired
              >
                <BaseInput defaultValue={dataEditing?.status} />
              </FormGroup>
            </div>
            <FormGroup label="Mô tả" isRequrired>
              <BaseInput placeholder="Nhập mô tả" />
            </FormGroup>
          </div>
        }
        handleSubmit={async () => {}}
        confirmText="Lưu"
        handleCancel={() => {
          setIdEdit('');
          setIsEditing(false);
        }}
        minWidth={'1000px'}
      />
    </div>
  );
}

export default Material;
