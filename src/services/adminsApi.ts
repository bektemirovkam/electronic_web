import {
  AdministratorCredentialsType,
  AdministratorInType,
  AdministratorOutType,
} from "./../models/Administrator";
import { axios } from "../api/axios";

export const adminsApi = {
  getAllAdmin: async (): Promise<AdministratorOutType[]> => {
    const { data } = await axios.get<AdministratorOutType[]>("/admins");
    return data;
  },
  createAdmin: async (
    formData: AdministratorInType
  ): Promise<AdministratorOutType[]> => {
    const { data } = await axios.post<AdministratorOutType[]>(
      "/admins",
      formData
    );
    return data;
  },
  checkAdmin: async (
    formData: AdministratorCredentialsType
  ): Promise<AdministratorOutType> => {
    const { data } = await axios.post<AdministratorOutType>(
      "/checkAdmin",
      formData
    );
    return data;
  },
  banAdmin: async (id: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(`admins/${id}`);
    return data;
  },
  updateAdmin: async (
    id: number,
    formData: AdministratorInType
  ): Promise<AdministratorOutType[]> => {
    const { data } = await axios.patch<AdministratorOutType[]>(
      `/admins/${id}`,
      formData
    );
    return data;
  },
  getAdminById: async (id: number): Promise<AdministratorOutType[]> => {
    const { data } = await axios.get<AdministratorOutType[]>(`/admins/${id}`);
    return data;
  },
};
