import { ContractorTypesEnum } from "./../../types";
import { ContractorsQueryFilterType } from "../../types";
import { AppStateType } from "./../store";
const getContractorsState = (state: AppStateType) => state.contractors;

export const getCurrentContractorState = (state: AppStateType) =>
  getContractorsState(state).currentContractor;

export const getContractorsListState =
  (searchText: string, filter: ContractorsQueryFilterType) =>
  (state: AppStateType) =>
    getContractorsState(state)
      .contractors?.filter((contractor) => {
        if (filter === "deleted") {
          return contractor.isDeleted;
        } else if (filter === "customers") {
          return contractor.contractorType === ContractorTypesEnum.CUSTOMER;
        } else if (filter === "supplier") {
          return contractor.contractorType === ContractorTypesEnum.SUPPLIER;
        }
        return true;
      })
      ?.filter((contractor) =>
        contractor.name.toLowerCase().includes(searchText.toLowerCase())
      );
export const getContractorsLoadingState = (state: AppStateType) =>
  getContractorsState(state).contractorsLoading;
export const getContractorsActionStatusState = (state: AppStateType) =>
  getContractorsState(state).contractorsActionStatus;
export const getContractorsErrorMessage = (state: AppStateType) =>
  getContractorsState(state).errorMessage;
