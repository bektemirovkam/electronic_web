import categories from "../../pages/CategoriesPage/categories";
import { CategoryQueryFilterType } from "../../types";
import { AppStateType } from "./../store";

const getCategoriesState = (state: AppStateType) => state.categories;

const getAllCategoriesState = (state: AppStateType) =>
  getCategoriesState(state).categories;

export const getCategoriesErrorMessageState = (state: AppStateType) =>
  getCategoriesState(state).errorMessage;

export const getCategoriesLoadingState = (state: AppStateType) =>
  getCategoriesState(state).isLoadingCategories;

export const getMainCategoriesState =
  (filter: CategoryQueryFilterType) => (state: AppStateType) =>
    // getAllCategoriesState(state)?
    categories
      .filter((category) => {
        if (filter) {
          return category.isDeleted === true;
        }
        return true;
      })
      .filter((category) => category.parentId === 0);

export const getSubCategoriesState =
  (filter: CategoryQueryFilterType) => (state: AppStateType) =>
    // getAllCategoriesState(state)?
    categories
      .filter((category) => {
        if (filter) {
          return category.isDeleted === true;
        }
        return true;
      })
      .filter((category) => category.parentId !== 0);
export const getCurrentCategoryState = (state: AppStateType) =>
  getCategoriesState(state).currentCategory;
