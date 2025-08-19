import { TableData } from '@/components/BaseComponents/TableData';
import { useUnitColumns } from './hooks';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmModal } from '@/components/BaseComponents/ConfirmModal';
import FormGroup from '@/components/BaseComponents/FormGroup';
import BaseInput from '@/components/BaseComponents/BaseInput';
import { format } from 'date-fns';
import SearchInput from '@/components/BaseComponents/SearchInput';
import {
  createMaterialUnit,
  deleteUnit,
  getMaterialUnit,
  updateMaterialUnit,
} from '@/api/material';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/BaseComponents/Loading';
import { Button } from '@/components/Shadcn/button';
import { Plus } from 'lucide-react';
import { useFormik } from 'formik';
import { toastNotification, zodToFormikValidate } from '@/lib/utils';
import {
  createMaterialUnitSchema,
  updateMaterialUnitSchema,
  type MaterialUnitCreateFormValues,
  type MaterialUnitUpdateFormValues,
} from '@/lib/validations/material.schema/material.schema';
import SelectStatus from '@/components/BaseComponents/SelectStatus';
import type { FormikProps } from 'formik';

type MaterialUnitCreateFormik = FormikProps<MaterialUnitCreateFormValues>;
type MateriaUnitlUpdateFormik = FormikProps<MaterialUnitUpdateFormValues>;

function UnitMaterial() {
  const [idEdit, setIdEdit] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [dataDelete, setDataDelete] = useState({ name: '', id: '' });
  const [isDelete, setIsDelete] = useState(false);

  const {
    data: listMu,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['list-material-unit'],
    queryFn: getMaterialUnit,
  });

  const { columns } = useUnitColumns(
    setIdEdit,
    setIsEditing,
    setDataDelete,
    setIsDelete
  );

  const handleDelete = async () => {
    try {
      await deleteUnit(dataDelete.id);
      toastNotification('Xóa đơn vị tính thành công', 'success');
      setDataDelete({ name: '', id: '' });
      setIsDelete(false);
      refetch();
    } catch (error) {
      if (error instanceof Error) toastNotification(error.message, 'error');
    }
  };

  const formikCreate: MaterialUnitCreateFormik =
    useFormik<MaterialUnitCreateFormValues>({
      initialValues: {
        name: '',
      },
      validate: zodToFormikValidate(
        createMaterialUnitSchema,
        () => formikCreate.submitCount
      ),
      onSubmit: async (values) => {
        try {
          await createMaterialUnit(values);
          toastNotification('Tạo đơn vị tính mới thành công', 'success');
          setIsCreate(false);
          formikCreate.resetForm();
          refetch();
        } catch (error) {
          if (error instanceof Error) toastNotification(error.message, 'error');
        }
      },
    });

  const formikUpdate: MateriaUnitlUpdateFormik =
    useFormik<MaterialUnitUpdateFormValues>({
      initialValues: {
        name: '',
        statusId: 1,
      },
      validate: zodToFormikValidate(
        updateMaterialUnitSchema,
        () => formikCreate.submitCount
      ),
      onSubmit: async (values) => {
        try {
          await updateMaterialUnit(dataEditing?.id || '', values);
          toastNotification('Cập nhật đơn vị tính thành công', 'success');
          setIsEditing(false);
          formikUpdate.resetForm();
          refetch();
        } catch (error) {
          if (error instanceof Error) toastNotification(error.message, 'error');
        }
      },
    });

  const dataEditing = useMemo(() => {
    if (idEdit) return listMu?.results.filter((item) => item.id === idEdit)[0];
    // eslint-disable-next-line
  }, [idEdit]);

  useEffect(() => {
    if (dataEditing)
      formikUpdate.setValues({
        name: dataEditing.name,
        statusId: dataEditing.status.id,
      });
    // eslint-disable-next-line
  }, [dataEditing]);

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex items-center justify-between">
        <SearchInput placeholder="Tìm kiếm" />
        <div className="flex gap-2">
          <Button variant={'outline'} onClick={() => setIsCreate(true)}>
            <Plus />
            Thêm mới{' '}
          </Button>
        </div>
      </div>
      {listMu?.results && (
        <div className="mt-4">
          <TableData columns={columns} data={listMu?.results} />
        </div>
      )}

      <ConfirmModal
        open={isCreate}
        onOpenChange={setIsCreate}
        title={'Tạo đơn vị tính'}
        content={
          <FormGroup
            label="Tên đơn vị tính"
            isRequrired
            errorMsg={formikCreate.errors.name}
          >
            <BaseInput
              id="name"
              onChange={formikCreate.handleChange}
              value={formikCreate.values.name}
            />
          </FormGroup>
        }
        handleSubmit={formikCreate.handleSubmit}
        confirmText="Tạo mới"
        handleCancel={() => {
          setIsCreate(false);
          formikCreate.resetForm();
        }}
      />

      <ConfirmModal
        open={Boolean(isEditing)}
        onOpenChange={setIsEditing}
        title={'Chỉnh sửa thông tin đơn vị tính'}
        content={
          <div>
            <div className="grid grid-cols-2 items-center gap-3 mb-3">
              <FormGroup label="Ngày khởi tạo">
                <BaseInput
                  isReadonly={true}
                  value={format(
                    dataEditing ? new Date(dataEditing.createdAt) : Date.now(),
                    'dd/MM/yyyy'
                  )}
                />
              </FormGroup>
              <FormGroup label="Mã đơn vị tính">
                <BaseInput isReadonly={true} value={dataEditing?.id} />
              </FormGroup>
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <FormGroup
                label="Tên đơn vị tính"
                isRequrired
                errorMsg={formikCreate.errors.name}
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
            </div>
          </div>
        }
        handleSubmit={formikUpdate.handleSubmit}
        confirmText="Lưu"
        handleCancel={() => {
          setIdEdit('');
          setIsEditing(false);
          formikUpdate.resetForm();
        }}
      />

      <ConfirmModal
        open={isDelete}
        onOpenChange={setIsDelete}
        title={'Xóa đơn vị tính'}
        content={
          <div>
            Bạn có chắc chắn muốn xóa đơn vị tính{' '}
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

export default UnitMaterial;
