import { api } from './configs/axiosConfigs';
import { IRoomsParams, EOrderDirection } from '../interfaces/room';
import * as qs from 'qs';

export const RoomAPI = {
  getAll: async function (params?: IRoomsParams) {
    const response = await api.request({
      url: '/room',
      method: 'GET',
      params: {
        page: params?.page,
        page_size: params?.page_size ? params?.page_size : 8,
        order_direction: params?.order_direction
          ? params?.order_direction
          : EOrderDirection.DESC,
        name: params?.name,
        address: params?.address,
        type: params?.type,
        area_from: params?.area_from,
        area_to: params?.area_to,
        distance_to_school_from: params?.distance_to_school_from,
        distance_to_school_to: params?.distance_to_school_to,
        price_from: params?.price_from,
        price_to: params?.price_to,
        electronic_price_from: params?.electronic_price_from,
        electronic_price_to: params?.electronic_price_to,
        water_price_from: params?.water_price_from,
        water_price_to: params?.water_price_to,
        wifi_internet: params?.wifi_internet,
        air_conditioner: params?.air_conditioner,
        water_heater: params?.water_heater,
        refrigerator: params?.refrigerator,
        washing_machine: params?.washing_machine,
        enclosed_toilet: params?.enclosed_toilet,
        safed_device: params?.safed_device,
      },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    })
    return response.data;
  },
  getOne: async function name(id: string) {
    const response = await api.request({
      url: '/rooms/' + id,
      method: 'GET',
    });
    return response.data;
  },
};
