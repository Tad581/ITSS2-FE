import { api } from './configs/axiosConfigs';

export const RoomAPI = {
  get: async function () {
    const response = await api.request({
      url: '/room',
      method: 'GET',
    });
    return response.data;
  },
};
