import { axiosAPIBaseConfig } from './axios';
import type { PaginatedResponse } from '@/enum/api';
import type {
  CreateNewMaterial,
  CreateNewMaterialUnit,
  MaterialGroupItem,
  MaterialItem,
  MaterialUnitItem,
  UpdateMaterial,
  UpdateMaterialUnit,
} from '@/types/dto/material';

export const getMaterialGroup = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<MaterialGroupItem>>(
      '/material-group'
    );
  return response.data;
};

// material
export const getMaterial = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<MaterialItem>>('/material');
  return response.data;
};

export const createMaterial = async (data: CreateNewMaterial) => {
  const response = await axiosAPIBaseConfig.post<{
    status: number;
    message: string;
  }>('/material', data);
  return response;
};

export const updateMaterial = async (id: string, data: UpdateMaterial) => {
  const response = await axiosAPIBaseConfig.patch<{
    status: number;
    message: string;
  }>(`/material/${id}`, data);
  return response;
};

// material unit
export const getMaterialUnit = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<MaterialUnitItem>>(
      '/material-unit'
    );
  return response.data;
};

export const createMaterialUnit = async (data: CreateNewMaterialUnit) => {
  const response = await axiosAPIBaseConfig.post<{
    status: number;
    message: string;
  }>('/material-unit', data);
  return response;
};

export const updateMaterialUnit = async (
  id: string,
  data: UpdateMaterialUnit
) => {
  const response = await axiosAPIBaseConfig.patch<{
    status: number;
    message: string;
  }>(`/material-unit/${id}`, data);
  return response;
};
