import { api } from './configs/axiosConfigs';
import { IRoomsParams, EOrderDirection } from '../interfaces/room';
import * as qs from 'qs';

const prefix = '/rooms/'

export const RoomAPI = {
  getAll: async function (params?: IRoomsParams) {
    const response = await api.request({
      url: prefix,
      method: 'GET',
      params: {
        page: params?.page,
        pageSize: params?.pageSize ? params?.pageSize : 8,
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
        electronicPrice_from: params?.electronicPrice_from,
        electronicPrice_to: params?.electronicPrice_to,
        waterPrice_from: params?.waterPrice_from,
        waterPrice_to: params?.waterPrice_to,
        wifiInternet: params?.wifiInternet,
        airConditioner: params?.airConditioner,
        waterHeater: params?.waterHeater,
        refrigerator: params?.refrigerator,
        washingMachine: params?.washingMachine,
        enclosedToilet: params?.enclosedToilet,
        safedDevice: params?.safedDevice,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    return response.data;
  },
  getOne: async function (id: string) {
    const response = await api.request({
      url: prefix + id,
      method: 'GET',
    });
    return response.data;
  },
  getOwnerRooms: async function (params: {
    romOwnerId: string;
    page?: number;
    pageSize?: number;
    order_direction?: string;
  }) {
    const response = await api.request({
      url: prefix + 'owner/' + params.romOwnerId,
      method: 'GET',
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
        order_direction: params?.order_direction,
      },
    });
    return response.data;
  },
  deleteRoom: async function (params: { id: string }) {
    const response = await api.request({
      url: prefix + params.id,
      method: 'DELETE',
    });
    return response.data;
  },
  createRoom: async function (params: FormData) {
    const response = await api.request({
      url: prefix,
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data;
  },
  updateRoom: async function (id: string, params: FormData) {
    const response = await api.request({
      url: prefix + id,
      method: 'PUT',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data;
  },
};
