import { api } from "./configs/axiosConfigs";
import { IUserCreateInput, IUser } from "../interfaces/user";

export const UserAPI = {
  createaUser: async function (params: IUserCreateInput) {
    const data = {
      userName: params.userName,
      passWord: params.passWord,
      role: params.role,
      avatarUrl: params.avatarUrl,
      phoneNumber: params.phoneNumber,
      gender: params.gender,
      dateOfBirth: params.dateOfBirth.toISOString(),
    };
    console.log("data", data);
    const response = await api.request({
      url: "/users/",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("res", response);
    return response.data;
  },
  getUser: async function (firebaseId: string) {
    const response = await api.request({
      url: `/users/${firebaseId}`,
      method: "GET",
    });
    return response.data;
  },
  editUser: async function (params: IUser) {
    // const response = await api.request({
    //   url: `/users/${params.uid}`,
    //   method: 'PUT',
    //   body: {
    //     phoneNumber
    //     dateOfBirth: params.dateOfBirth.toISOString(),
    //   }
    // })
  },
  getAllUser: async function (params: { page?: number; pageSize?: number }) {
    const response = await api.request({
      url: "/users",
      method: "GET",
      params: {
        page: params?.page,
        size: params?.pageSize,
      },
    });
    return response.data.data.content;
  },
};
