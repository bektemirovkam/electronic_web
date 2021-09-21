import { axios } from "../api/axios";
import { AddContractorFormDataType, ContractorType } from "../types";

export const contractorsApi = {
  // contractors
  getContractors: async (): Promise<ContractorType[]> => {
    const { data } = await axios.get<ContractorType[]>("contractors");
    return data;
  },
  createContractor: async (
    formData: AddContractorFormDataType
  ): Promise<ContractorType[]> => {
    const { data } = await axios.post<ContractorType[]>(
      "contractors",
      formData
    );
    return data;
  },

  // contractors/${id}

  updateContractor: async (
    formData: AddContractorFormDataType,
    id: number
  ): Promise<ContractorType[]> => {
    const { data } = await axios.patch(`/contractors/${id}`, formData);
    return data;
  },
  deleteContractor: async (contractorId: number): Promise<boolean> => {
    const { data } = await axios.delete<boolean>(
      `/contractors/${contractorId}`
    );
    return data;
  },

  // contractors/${id}

  getContractorById: async (
    contractorId: number
  ): Promise<ContractorType[]> => {
    const { data } = await axios.get<ContractorType[]>(
      `/contractors/${contractorId}`
    );
    return data;
  },
};
