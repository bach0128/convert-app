import { TableData } from '@/components/BaseComponents/TableData';
import { useGroupColumns } from './hooks';
import { useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import SearchInput from '@/components/BaseComponents/SearchInput';
import { mockMaterial } from '@/mocks/Material';
import {
  createMaterial,
  getMaterial,
  getMaterialGroup,
  getMaterialUnit,
} from '@/api/material';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/BaseComponents/Loading';
import { Button } from '@/components/Shadcn/button';
import { File, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Shadcn/select';
import { useFormik } from 'formik';
import { toastNotification, zodToFormikValidate } from '@/lib/utils';
import {
  createMaterialSchema,
  type MaterialFormValues,
} from '@/lib/validations/material.schema/material.schema';

function Material() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const {
    data: listMaterial,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['list-material'],
    queryFn: getMaterial,
  });

  const {
    data: listMG,
    isLoading: isLoadingMg,
    // refetch,
  } = useQuery({
    queryKey: ['list-material-group'],
    queryFn: getMaterialGroup,
  });

  const {
    data: listMU,
    isLoading: isLoadingMu,
    // refetch,
  } = useQuery({
    queryKey: ['list-material-unit'],
    queryFn: getMaterialUnit,
  });

  const { columns } = useGroupColumns(setIdEdit, setIsEditing);

  const dataEditing = useMemo(() => {
    if (idEdit) return mockMaterial.filter((item) => item.id === idEdit)[0];
  }, [idEdit]);

  const formik = useFormik<MaterialFormValues>({
    initialValues: {
      name: '',
      unitId: '',
      groupId: '',
      price: '',
      description: '',
    },
    validate: zodToFormikValidate(createMaterialSchema),
    onSubmit: async (values) => {
      try {
        if (values.description === null) {
          await createMaterial({
            name: values.name,
            unitId: values.unitId,
            groupId: values.groupId,
            price: values.price,
          });
        } else await createMaterial(values);
        toastNotification('Tạo hộ kinh doanh mới thành công', 'success');
        setIsCreate(false);
        formik.resetForm();
        refetch();
      } catch (error) {
        if (error instanceof Error) toastNotification(error.message, 'error');
      }
    },
  });

  return (
    <div>
      {(isLoading || isLoadingMg || isLoadingMu) && <Loading />}
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Tìm kiếm" />
        <div className="flex gap-3">
          <Button variant={'outline'} onClick={() => setIsCreate(true)}>
            <Plus />
            Thêm mới{' '}
          </Button>
          <Button variant={'outline'}>
            <File /> Xuất file{' '}
          </Button>
        </div>
      </div>
      {listMaterial && (
        <div className="mt-4">
          <TableData columns={columns} data={listMaterial.results} />
        </div>
      )}

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
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue('bussinessType', +value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto">
                    <SelectGroup>
                      {listMG?.results.map((item) => (
                        <SelectItem
                          key={item.id}
                          id="bussinessType"
                          value={item.id}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

      <ConfirmModal
        open={Boolean(isCreate)}
        onOpenChange={setIsCreate}
        title={'Thông tin hàng hóa và dịch vụ'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 justify-center">
              <FormGroup
                label="Tên HHDV"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.name}
              >
                <BaseInput
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isError={!!(formik.touched.name && formik.errors.name)}
                />
              </FormGroup>
              <FormGroup
                label="Nhóm HHDV"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.groupId}
              >
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue('groupId', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto">
                    <SelectGroup>
                      {listMG?.results.map((item) => (
                        <SelectItem key={item.id} id="groupId" value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormGroup>
              {/* <FormGroup label="Loại" isRequrired>
                <BaseInput value={dataEditing?.category} />
              </FormGroup> */}
            </div>
            <div className="flex items-center gap-3 w-full justify-center">
              <FormGroup
                label="ĐVT"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.unitId}
              >
                <Select
                  onValueChange={(value) =>
                    formik.setFieldValue('unitId', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đơn vị tính" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto">
                    <SelectGroup>
                      {listMU?.results.map((item) => (
                        <SelectItem key={item.id} id="unitId" value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormGroup>
              {/* <FormGroup label="Nguồn gốc" isRequrired>
                <BaseInput defaultValue={dataEditing?.provider} />
              </FormGroup> */}
              <FormGroup
                label="Giá bán ra"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formik.errors.price}
              >
                <BaseInput
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  id="price"
                  isError={!!(formik.touched.price && formik.errors.price)}
                />
              </FormGroup>
              {/* <FormGroup label="Chiết khấu">
                <BaseInput defaultValue={dataEditing?.discount || 0} />
              </FormGroup> */}
            </div>
            {/* <div className="flex items-center gap-3 w-full">
              <FormGroup
                label="Giảm thuế giá trị gia tăng"
                wrapperClass="w-full"
                isRequrired
              >
                <BaseInput />
              </FormGroup>
            </div> */}
            <FormGroup label="Mô tả">
              <BaseInput
                placeholder="Nhập mô tả"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </FormGroup>
          </div>
        }
        handleSubmit={formik.handleSubmit}
        confirmText="Tạo mới"
        handleCancel={() => {
          setIsCreate(false);
        }}
        minWidth={'1000px'}
      />
    </div>
  );
}

export default Material;
