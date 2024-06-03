import { api } from './configs/axiosConfigs';
import { IUserCreateInput } from '../interfaces/user';

export const UserAPI = {
  createaUser: async function (params: IUserCreateInput) {
    const response = await api.request({
      url: '/users/',
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getUser: async function (firebaseId: string) {
    const response = await api.request({
      url: `/users/${firebaseId}`,
      method: 'GET',
    });
    return response.data;
  },
};
