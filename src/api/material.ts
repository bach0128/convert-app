import { axiosAPIBaseConfig } from './axios';
import type { PaginatedResponse } from '@/enum/api';
import type {
  CreateNewMaterial,
  MaterialGroupItem,
  MaterialItem,
  MaterialUnitItem,
} from '@/types/dto/material';

export const getMaterialGroup = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<MaterialGroupItem>>(
      '/material-group'
    );
  return response.data;
};

export const getMaterialUnit = async () => {
  const response =
    await axiosAPIBaseConfig.get<PaginatedResponse<MaterialUnitItem>>(
      '/material-unit'
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
