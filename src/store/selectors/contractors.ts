import moment from "moment";
import { createSelector } from "reselect";
import {
  ContractorsQueryFilterType,
  ContractorTypesEnum,
} from "../../models/Contractors";
import { AppStateType } from "./../store";
import { getMainCategoriesState } from "./categories";

const getContractorsState = (state: AppStateType) => state.contractors;

export const getContractorsListState = (state: AppStateType) =>
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

export const getContractorsByCategoriesState = createSelector(
  [getMainCategoriesState, getContractorsListState],
  (mainCategories, contractors) => {
    if (mainCategories && contractors) {
      const contractorsByCategories = mainCategories.map((category) => {
        const contractorsByCurrentCategory = contractors.filter(
          (contractor) => {
            const wantedCategory = contractor.categories.find(
              (contractorCategory) =>
                contractorCategory.categoryId === category.id
            );

            if (wantedCategory) {
              return true;
            }
            return false;
          }
        );

        return {
          categoryName: category.name,
          contractorsCount: contractorsByCurrentCategory.length,
        };
      });
      return contractorsByCategories;
    } else {
      return [];
    }
  }
);

export const getContractorAvatarUploadingState = (state: AppStateType) =>
  getContractorsState(state).contractorAvatarUploading;

export const getContractorAvatarsState = (state: AppStateType) =>
  getContractorsState(state).contractorAvatars;

export const getTodayContractorsCountState = createSelector(
  [getContractorsListState],
  (contractors) => {
    if (contractors) {
      const startDayTime = moment().startOf("day").valueOf();
      const endDayTime = moment().endOf("day").valueOf();
      const createdToday = contractors.filter((contractor) => {
        return (
          contractor.creationDate > startDayTime &&
          contractor.creationDate < endDayTime
        );
      });
      return createdToday.length;
    } else {
      return 0;
    }
  }
);
