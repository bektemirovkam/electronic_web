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
  categories.filter(
    (category) => category.parentId === 0 && !category.isDeleted
  );

export const getSubCategoriesState = (state: AppStateType) =>
  // getAllCategoriesState(state)?
  categories.filter(
    (category) => category.parentId !== 0 && !category.isDeleted
  );

export const getDeletedCategoriesState = (state: AppStateType) =>
  // getAllCategoriesState(state)?
  categories.filter((category) => category.isDeleted);

export const getCurrentCategoryState = (state: AppStateType) =>
  getCategoriesState(state).currentCategory;

export const getCategoryInProcessEditState = (state: AppStateType) =>
  getCategoriesState(state).categoryInProcessEdit;

export const getCategoriesActionStatusState = (state: AppStateType) =>
  getCategoriesState(state).categoriesActionStatus;

export const getCategoriesTreeDataState = (state: AppStateType) => {
  const mainCategories = getMainCategoriesState(state);
  const subCategories = getSubCategoriesState(state);

  const tree = mainCategories.map((mainCat) => {
    const subCats = subCategories
      .filter((subCat) => subCat.parentId === mainCat.id)
      .map((subCat) => {
        return {
          title: subCat.name,
          value: subCat.id,
          key: subCat.id,
        };
      });
    return {
      title: mainCat.name,
      value: mainCat.id,
      key: mainCat.id,
      children: subCats,
    };
  });

  return tree;
};
