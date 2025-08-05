import { axiosAPIBaseConfig } from '@/api/axios';
import { BUSSINESS_ENDPOINTS } from '@/api/endPoints';

export class BussinessHousehold {
  static async getListBussinessHousehold(): Promise<any> {
    const response = await axiosAPIBaseConfig.post<any>(
      BUSSINESS_ENDPOINTS.INDEX
    );
    return response.data;
  }
}
