import {
  AdministratorCredentialsType,
  AdministratorInType,
  AdministratorOutType,
} from "./../models/Administrator";
import { axios } from "../api/axios";
import { Result } from "../models/types";

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
  ): Promise<Result> => {
    const { data } = await axios.post<Result>("/admins", formData);
    return data;
  },
  deleteAdmin: async (id: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(`admins/${id}`);
    return data;
  },
};
