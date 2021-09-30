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
  filter: ContractorsQueryFilterType,
  categoryId: string | null
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
      )
      ?.filter((contractor) => {
        if (categoryId) {
          return Boolean(
            contractor.categories.find((category) => {
              return (
                category.categoryId === Number(categoryId) ||
                category.parentId === Number(categoryId)
              );
            })
          );
        }
        return true;
      });
  });

export const getContractorsLoadingState = (state: AppStateType) =>
  getContractorsState(state).contractorsLoading;
export const getContractorsActionStatusState = (state: AppStateType) =>
  getContractorsState(state).contractorsActionStatus;
export const getContractorsErrorMessage = (state: AppStateType) =>
  getContractorsState(state).errorMessage;

export const getContractorsCountState = createSelector(
  [getFilteredContractorsListState("", null, null)],
  (contractors) => contractors?.length
);

export const getCustomersCountState = createSelector(
  [getFilteredContractorsListState("", "customers", null)],
  (contractors) => contractors?.length
);

export const getSuppliersCountState = createSelector(
  [getFilteredContractorsListState("", "supplier", null)],
  (contractors) => contractors?.length
);

export const getDeletedContractorCountState = createSelector(
  [getFilteredContractorsListState("", "deleted", null)],
  (contractors) => contractors?.length
);

export const getContractorImagesState = (state: AppStateType) =>
  getContractorsState(state).contractorImages;
export const getContractorImageUploadingState = (state: AppStateType) =>
  getContractorsState(state).contractorImageUploading;
