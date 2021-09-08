import categories from "../../pages/CategoriesPage/categories";
import { AppStateType } from "./../store";

const getCategoriesState = (state: AppStateType) => state.categories;

const getAllCategoriesState = (state: AppStateType) =>
  getCategoriesState(state).categories;

export const getCategoriesErrorMessageState = (state: AppStateType) =>
  getCategoriesState(state).errorMessage;

export const getCategoriesLoadingState = (state: AppStateType) =>
  getCategoriesState(state).isLoadingCategories;

export const getMainCategoriesState = (state: AppStateType) =>
  // getAllCategoriesState(state)?
  categories.filter((category) => category.parentId === 0);

export const getSubCategoriesState = (state: AppStateType) =>
  // getAllCategoriesState(state)?
  categories.filter((category) => category.parentId !== 0);
export const getCurrentCategoryState = (state: AppStateType) =>
  getCategoriesState(state).currentCategory;

export const getCategoryInProcessEditState = (state: AppStateType) =>
  getCategoriesState(state).categoryInProcessEdit;

export const getCategoriesActionStatusState = (state: AppStateType) =>
  getCategoriesState(state).categoriesActionStatus;
