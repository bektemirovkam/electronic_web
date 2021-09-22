import { createSelector } from "reselect";
import {
  ContractorsQueryFilterType,
  ContractorTypesEnum,
} from "../../models/Contractors";
import { AppStateType } from "./../store";

const getContractorsState = (state: AppStateType) => state.contractors;

const getContractorsListState = (state: AppStateType) =>
  state.contractors.contractors;

export const getCurrentContractorState = (state: AppStateType) =>
  getContractorsState(state).currentContractor;

export const getFilteredContractorsListState = (
  searchText: string,
  filter: ContractorsQueryFilterType
) =>
  createSelector([getContractorsListState], (contractors) => {
    return contractors
      ?.filter((contractor) => {
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
  });

export const getContractorsLoadingState = (state: AppStateType) =>
  getContractorsState(state).contractorsLoading;
export const getContractorsActionStatusState = (state: AppStateType) =>
  getContractorsState(state).contractorsActionStatus;
export const getContractorsErrorMessage = (state: AppStateType) =>
  getContractorsState(state).errorMessage;

export const getContractorsCountState = createSelector(
  [getFilteredContractorsListState("", null)],
  (contractors) => contractors?.length
);

export const getCustomersCountState = createSelector(
  [getFilteredContractorsListState("", "customers")],
  (contractors) => contractors?.length
);

export const getSuppliersCountState = createSelector(
  [getFilteredContractorsListState("", "supplier")],
  (contractors) => contractors?.length
);

export const getDeletedContractorCountState = createSelector(
  [getFilteredContractorsListState("", "deleted")],
  (contractors) => contractors?.length
);

export const getContractorImagesState = (state: AppStateType) =>
  getContractorsState(state).contractorImages;
export const getContractorImageUploadingState = (state: AppStateType) =>
  getContractorsState(state).contractorImageUploading;
