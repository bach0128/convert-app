import { axiosAPIBaseConfig } from './axios';
import type { PaginatedResponse } from '@/enum/api';
import type { MaterialGroupItem, MaterialUnitItem } from '@/types/dto/material';

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
