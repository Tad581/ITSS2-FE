import { api } from './configs/axiosConfigs';

export const ReviewAPI = {
  postOneReview: async function (params: FormData) {
    const response = await api.request({
      url: '/room/review',
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
