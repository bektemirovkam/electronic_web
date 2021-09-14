import { axios } from "../api/axios";
import {
  AddContractorFormDataType,
  ContractorFullInfoType,
  ContractorType,
} from "../types";

export const contractorsApi = {
  // contractors
  getContractors: async (): Promise<ContractorType[]> => {
    const { data } = await axios.get<ContractorType[]>("contractors");
    return data;
  },
  createContractor: async (
    formData: AddContractorFormDataType
  ): Promise<ContractorFullInfoType[]> => {
    const { data } = await axios.post<ContractorFullInfoType[]>(
      "contractors",
      formData
    );
    return data;
  },

  // contractors/${id}

  updateContractor: async (
    formData: AddContractorFormDataType,
    id: number
  ): Promise<ContractorFullInfoType[]> => {
    const { data } = await axios.patch(`/contractors/${id}`, formData);
    return data;
  },
  deleteContractor: async (contractorId: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(
      `/contractors/${contractorId}`
    );
    return data;
  },

  // contractors/${id}/full

  getFullContractorInfo: async (
    contractorId: number
  ): Promise<ContractorFullInfoType[]> => {
    const { data } = await axios.get<ContractorFullInfoType[]>(
      `/contractors/${contractorId}/full`
    );
    return data;
  },
};
