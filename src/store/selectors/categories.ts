import { AppStateType } from "./../store";

const getCategoriesState = (state: AppStateType) => state.categories;

const getAllCategoriesState = (state: AppStateType) =>
  getCategoriesState(state).categories;

export const getCategoriesErrorMessageState = (state: AppStateType) =>
  getCategoriesState(state).errorMessage;

export const getCategoriesLoadingState = (state: AppStateType) =>
  getCategoriesState(state).isLoadingCategories;

export const getMainCategoriesState = (state: AppStateType) =>
  getAllCategoriesState(state)?.filter((category) => category.parentId === 0);

export const getSubCategoriesState =
  (parentId: number) => (state: AppStateType) =>
    getAllCategoriesState(state)?.filter(
      (category) => category.parentId === parentId
    );
