import { axios } from "../api/axios";
import { ContractorType } from "../types";

export const contractorsApi = {
  createContractor: async (formData: ContractorType): Promise<boolean> => {
    const { data } = await axios.post<boolean>("contractors", formData);
    return data;
  },
  updateContractor: async (
    formData: ContractorType,
    id: number
  ): Promise<boolean> => {
    const { data } = await axios.patch(`/contractors/${id}`, formData);
    return data;
  },
};
