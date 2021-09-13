import { axios } from "../api/axios";
import { AddContractorFormDataType, ContractorFullInfoType } from "../types";

export const contractorsApi = {
  createContractor: async (
    formData: AddContractorFormDataType
  ): Promise<ContractorFullInfoType[]> => {
    const { data } = await axios.post<ContractorFullInfoType[]>(
      "contractors",
      formData
    );
    return data;
  },
  updateContractor: async (
    formData: ContractorFullInfoType,
    id: number
  ): Promise<ContractorFullInfoType[]> => {
    const { data } = await axios.patch(`/contractors/${id}`, formData);
    return data;
  },
};
