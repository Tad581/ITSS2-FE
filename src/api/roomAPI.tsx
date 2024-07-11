import { api } from "./configs/axiosConfigs";
import { IRoomsParams, EOrderDirection } from "../interfaces/room";
import * as qs from "qs";

const prefix = "/rooms/";

export const RoomAPI = {
  getAll: async function (params?: IRoomsParams) {
    const filterParams: any = {};
    const AreaRange: any = {};
    const PriceRange: any = {};
    const WaterPriceRange: any = {};
    const ElectronicPriceRange: any = {};
    if (params?.type && params?.type !== "") {
      filterParams["Type"] = params.type;
    }
    if (params?.name) {
      filterParams["FullTextSearch"] = params.name;
    }
    if (params?.address) {
      filterParams["FullTextSearch"] = params.address;
    }
    if (params?.address) {
      filterParams["Address"] = params.address;
    }
    if (params?.wifiInternet) {
      filterParams["WifiInternet"] = params.wifiInternet;
    }
    if (params?.airConditioner) {
      filterParams["AirConditioner"] = params.airConditioner;
    }
    if (params?.waterHeater) {
      filterParams["WaterHeater"] = params.waterHeater;
    }
    if (params?.refrigerator) {
      filterParams["Refrigerator"] = params.refrigerator;
    }
    if (params?.washingMachine) {
      filterParams["WashingMachine"] = params.washingMachine;
    }
    if (params?.enclosedToilet) {
      filterParams["EnclosedToilet"] = params.enclosedToilet;
    }
    if (params?.safedDevice) {
      filterParams["SafedDevice"] = params.safedDevice;
    }
    if (params?.area_from || params?.area_from == 0) {
      AreaRange["MinArea"] = params.area_from;
    }
    if (params?.area_to) {
      AreaRange["MaxArea"] = params.area_to;
    }
    if (params?.price_from || params?.price_from === 0) {
      PriceRange["MinPrice"] = params.price_from;
    }
    if (params?.price_to) {
      PriceRange["MaxPrice"] = params.price_to;
    }
    if (params?.waterPrice_from || params?.waterPrice_from === 0) {
      WaterPriceRange["MinWaterPrice"] = params.waterPrice_from;
    }
    if (params?.waterPrice_to || params?.waterPrice_to === 0) {
      WaterPriceRange["MaxWaterPrice"] = params.waterPrice_to;
    }
    if (params?.electronicPrice_from || params?.electronicPrice_from === 0) {
      ElectronicPriceRange["MinElectronicPrice"] = params.electronicPrice_from;
    }
    if (params?.electronicPrice_to || params?.electronicPrice_to === 0) {
      ElectronicPriceRange["MaxElectronicPrice"] = params.electronicPrice_to;
    }
    if (AreaRange.MinArea || AreaRange.MaxArea) {
      filterParams["AreaRange"] = AreaRange;
    }
    if (PriceRange.MinPrice || PriceRange.MaxPrice) {
      filterParams["PriceRange"] = PriceRange;
    }
    if (WaterPriceRange.MinWaterPrice || WaterPriceRange.MaxWaterPrice) {
      filterParams["WaterPriceRange"] = WaterPriceRange;
    }
    if (
      ElectronicPriceRange.MinElectronicPrice ||
      ElectronicPriceRange.MaxElectronicPrice
    ) {
      filterParams["ElectronicPriceRange"] = ElectronicPriceRange;
    }

    const response = await api.request({
      url: prefix,
      method: "GET",
      params: {
        page: params?.page,
        pageSize: params?.pageSize ? params?.pageSize : 8,
        sort: params?.sortOptions
          ? params?.sortOptions
          : EOrderDirection.PLUS_DATE,
        filter: JSON.stringify(filterParams),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return response.data;
  },
  getOne: async function (id: string) {
    const response = await api.request({
      url: prefix + id,
      method: "GET",
    });
    return response.data;
  },
  getOwnerRooms: async function (params: {
    romOwnerId: string;
    sortOptions?: string;
    sortOrder?: string;
  }) {
    const response = await api.request({
      url: prefix + "owner/" + params.romOwnerId,
      method: "GET",
      params: {
        sortBy: params?.sortOptions
          ? params?.sortOptions
          : EOrderDirection.PLUS_DATE,
        sortOrder: params?.sortOrder ? params?.sortOrder : "asc",
      },
    });
    return response.data;
  },
  deleteRoom: async function (params: { id: string }) {
    const response = await api.request({
      url: prefix + params.id,
      method: "DELETE",
    });
    return response.data;
  },
  createRoom: async function (params: FormData) {
    const response = await api.request({
      url: prefix,
      method: "POST",
      data: params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updateRoom: async function (id: string, params: FormData) {
    const response = await api.request({
      url: prefix + id,
      method: "PUT",
      data: params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  staticRoom: async function (startDate: string, endDate: string) {
    const response = await api.request({
      url: prefix + "newRooms",
      method: "GET",
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  }
};
