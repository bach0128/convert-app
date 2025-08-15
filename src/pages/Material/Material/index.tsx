import { TableData } from '@/components/BaseComponents/TableData';
import { useGroupColumns } from './hooks';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import SearchInput from '@/components/BaseComponents/SearchInput';
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  getMaterialGroup,
  getMaterialUnit,
  updateMaterial,
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
  updateMaterialSchema,
  type MaterialCreateFormValues,
  type MaterialUpdateFormValues,
} from '@/lib/validations/material.schema/material.schema';
import SelectStatus from '@/components/BaseComponents/SelectStatus';
import type { FormikProps } from 'formik';

type MaterialCreateFormik = FormikProps<MaterialCreateFormValues>;
type MaterialUpdateFormik = FormikProps<MaterialUpdateFormValues>;

function Material() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [dataDelete, setDataDelete] = useState({ name: '', id: '' });
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const {
    data: listMaterial,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['list-material'],
    queryFn: getMaterial,
  });

  const { data: listMG, isLoading: isLoadingMg } = useQuery({
    queryKey: ['list-material-group'],
    queryFn: getMaterialGroup,
  });

  const { data: listMU, isLoading: isLoadingMu } = useQuery({
    queryKey: ['list-material-unit'],
    queryFn: getMaterialUnit,
  });

  const handleDelete = async () => {
    try {
      await deleteMaterial(dataDelete.id);
      toastNotification('Xóa hàng hóa thành công', 'success');
      setDataDelete({ name: '', id: '' });
      setIsDelete(false);
      refetch();
    } catch (error) {
      if (error instanceof Error) toastNotification(error.message, 'error');
    }
  };

  const { columns } = useGroupColumns(
    setIdEdit,
    setIsEditing,
    setDataDelete,
    setIsDelete
  );

  const dataEditing = useMemo(() => {
    if (idEdit)
      return listMaterial?.results.filter((item) => item.id === idEdit)[0];
  }, [idEdit, listMaterial]);

  const formikCreate: MaterialCreateFormik =
    useFormik<MaterialCreateFormValues>({
      initialValues: {
        name: '',
        unitId: '',
        groupId: '',
        price: '',
        description: '',
      },
      validate: zodToFormikValidate(
        createMaterialSchema,
        () => formikCreate.submitCount
      ),
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
          toastNotification('Tạo hàng hóa mới thành công', 'success');
          setIsCreate(false);
          formikCreate.resetForm();
          refetch();
        } catch (error) {
          if (error instanceof Error) toastNotification(error.message, 'error');
        }
      },
    });

  const formikUpdate: MaterialUpdateFormik =
    useFormik<MaterialUpdateFormValues>({
      initialValues: {
        name: '',
        unitId: '',
        groupId: '',
        price: '',
        description: '',
        statusId: 1,
      },
      validate: zodToFormikValidate(
        updateMaterialSchema,
        () => formikUpdate.submitCount
      ),
      onSubmit: async (values) => {
        try {
          await updateMaterial(dataEditing?.id || '', values);
          toastNotification('Cập nhật hàng hóa thành công', 'success');
          setIsEditing(false);
          setIdEdit('');
          formikUpdate.resetForm();
          refetch();
        } catch (error) {
          if (error instanceof Error) toastNotification(error.message, 'error');
        }
      },
    });

  useEffect(() => {
    if (dataEditing)
      formikUpdate.setValues({
        name: dataEditing.name,
        unitId: dataEditing.unit.id,
        groupId: dataEditing.group.id,
        price: dataEditing.price,
        statusId: dataEditing.status.id,
        description: dataEditing.description || '',
      });
  }, [idEdit, formikUpdate, dataEditing]);

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
            <div className="grid grid-cols-3 items-center gap-3">
              <FormGroup label="Mã">
                <BaseInput isReadonly={true} value={dataEditing?.id} />
              </FormGroup>
              <FormGroup
                label="Tên HHDV"
                isRequrired
                errorMsg={formikUpdate.errors.name}
              >
                <BaseInput
                  value={formikUpdate.values.name}
                  onChange={formikUpdate.handleChange}
                  id="name"
                  isError={
                    !!(formikUpdate.touched.name && formikUpdate.errors.name)
                  }
                />
              </FormGroup>
              <FormGroup
                label="Nhóm HHDV"
                isRequrired
                errorMsg={formikUpdate.errors.groupId}
              >
                <Select
                  onValueChange={(value) =>
                    formikUpdate.setFieldValue('groupId', value)
                  }
                  defaultValue={formikUpdate.values.groupId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn ngành nghề kinh doanh chính" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto w-full">
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
              {/* <FormGroup label="Loại" isRequrired>
                <BaseInput value={dataEditing?.group} />
              </FormGroup> */}
            </div>
            <div className="grid grid-cols-2 items-center gap-3 w-full">
              <FormGroup
                label="ĐVT"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikUpdate.errors.unitId}
              >
                <Select
                  onValueChange={(value) =>
                    formikUpdate.setFieldValue('unitId', value)
                  }
                  defaultValue={formikUpdate.values.unitId}
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
                errorMsg={formikUpdate.errors.price}
              >
                <BaseInput
                  id="price"
                  defaultValue={formikUpdate.values.price}
                  onChange={formikUpdate.handleChange}
                  isError={
                    !!(formikUpdate.touched.price && formikUpdate.errors.price)
                  }
                />
              </FormGroup>
              {/* <FormGroup label="Chiết khấu">
                <BaseInput defaultValue={dataEditing?.discount || 0} />
              </FormGroup> */}
            </div>
            <div className="flex items-center gap-3 w-full">
              {/* <FormGroup
                label="Giảm thuế giá trị gia tăng"
                wrapperClass="w-full"
                isRequrired
              >
                <BaseInput />
              </FormGroup> */}
              <FormGroup
                label="Trạng thái sử dụng"
                wrapperClass="w-full"
                isRequrired
                errorMsg={formikUpdate.errors.statusId}
              >
                <SelectStatus
                  onChange={(value) =>
                    formikUpdate.setFieldValue('statusId', +value)
                  }
                  defaultValue={dataEditing?.status.id.toString()}
                />
              </FormGroup>
            </div>
            <FormGroup label="Mô tả">
              <BaseInput
                placeholder="Nhập mô tả"
                id="description"
                onChange={formikUpdate.handleChange}
                value={formikUpdate.values.description}
              />
            </FormGroup>
          </div>
        }
        handleSubmit={formikUpdate.handleSubmit}
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
        title={'Tạo mới hàng hóa và dịch vụ'}
        content={
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 justify-center">
              <FormGroup
                label="Tên HHDV"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.name}
              >
                <BaseInput
                  id="name"
                  value={formikCreate.values.name}
                  onChange={formikCreate.handleChange}
                  isError={
                    !!(formikCreate.touched.name && formikCreate.errors.name)
                  }
                />
              </FormGroup>
              <FormGroup
                label="Nhóm HHDV"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.groupId}
              >
                <Select
                  onValueChange={(value) =>
                    formikCreate.setFieldValue('groupId', value)
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
            <div className="flex gap-3 w-full justify-center">
              <FormGroup
                label="ĐVT"
                isRequrired
                wrapperClass="w-full"
                errorMsg={formikCreate.errors.unitId}
              >
                <Select
                  onValueChange={(value) =>
                    formikCreate.setFieldValue('unitId', value)
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
                errorMsg={formikCreate.errors.price}
              >
                <BaseInput
                  value={formikCreate.values.price}
                  onChange={formikCreate.handleChange}
                  id="price"
                  isError={
                    !!(formikCreate.touched.price && formikCreate.errors.price)
                  }
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
                value={formikCreate.values.description}
                onChange={formikCreate.handleChange}
              />
            </FormGroup>
          </div>
        }
        handleSubmit={formikCreate.handleSubmit}
        confirmText="Tạo mới"
        handleCancel={() => {
          setIsCreate(false);
          formikCreate.resetForm();
        }}
        minWidth={'1000px'}
      />

      <ConfirmModal
        open={isDelete}
        onOpenChange={setIsDelete}
        title={'Xóa hàng hóa'}
        content={
          <div>
            Bạn có chắc chắn muốn xóa hàng hóa{' '}
            <strong>{dataDelete.name}</strong> ?
          </div>
        }
        handleSubmit={handleDelete}
        handleCancel={() => {
          setIsDelete(false);
          setDataDelete({ name: '', id: '' });
        }}
      />
    </div>
  );
}

export default Material;
