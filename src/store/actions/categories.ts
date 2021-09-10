import {
  ActionStatusEnum,
  AddCategoryFormData,
  CategoryType,
} from "./../../types";
import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
import { AppStateType } from "../store";
import { categoriesApi } from "../../services/categoriesApi";
import { Dispatch } from "redux";

export const categoriesActions = {
  setAllCategories: (categories: CategoryType[]) => {
    return {
      type: "SET_CATEGORIES",
      payload: { categories },
    } as const;
  },
  setIsLoadingCategories: (isLoadingCategories: boolean) => {
    return {
      type: "SET_IS_LOADING_CATEGORIES",
      payload: {
        isLoadingCategories,
      },
    } as const;
  },
  setCategoriesErrorMessage: (errorMessage: string | null) => {
    return {
      type: "SET_CATEGORIES_ERROR_MESSAGE",
      payload: { errorMessage },
    } as const;
  },
  setCategoriesActionStatus: (categoriesActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_CATEGORIES_ACTION_STATUS",
      payload: { categoriesActionStatus },
    } as const;
  },
  setCurrentCategory: (currentCategory: CategoryType) => {
    return {
      type: "SET_CURRENT_CATEGORY",
      payload: { currentCategory },
    } as const;
  },
  setCategoryInEditProcess: (categoryInProcessEdit: number | null) => {
    return {
      type: "SET_CATEGORY_IN_EDIT_PROCESS",
      payload: { categoryInProcessEdit },
    } as const;
  },
  replaceCategory: (category: CategoryType) => {
    return {
      type: "REPLACE_CATEGORY",
      payload: { category },
    } as const;
  },
  removeCategory: (id: number) => {
    return {
      type: "REMOVE_CATEGORY",
      payload: { id },
    } as const;
  },
  clearCategories: () => {
    return {
      type: "CLEAR_CATEGORIES",
    } as const;
  },
  addNewCategory: (category: CategoryType) => {
    return {
      type: "ADD_NEW_CATEGORY",
      payload: { category },
    } as const;
  },
};

export type CategoriesActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof categoriesActions>
>;

const showError = (text: string, dispatch: Dispatch) => {
  dispatch(categoriesActions.setCategoriesActionStatus(ActionStatusEnum.ERROR));
  dispatch(categoriesActions.setCategoriesErrorMessage(text));
};

//TODO: как то проверять пришли ли данные без ошибки

export const getAllCategories = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(categoriesActions.setIsLoadingCategories(true));
    const categories = await categoriesApi.getAllCategories();
    dispatch(categoriesActions.setAllCategories(categories));
  } catch (error) {
    console.log("getAllCategories...", error);
    showError("Ошибка сети, попробуйте еще раз", dispatch);
  } finally {
    dispatch(categoriesActions.setIsLoadingCategories(false));
  }
};

// TODO: опасный метод
export const deleteAllCategories = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(categoriesActions.setIsLoadingCategories(true));
    const response = await categoriesApi.deleteAllCategories();
    if (response) {
      dispatch(
        categoriesActions.setCategoriesActionStatus(ActionStatusEnum.SUCCESS)
      );
      dispatch(categoriesActions.clearCategories());
    } else {
      showError(
        "Не удалось удалить все категории, попробуйте еще раз",
        dispatch
      );
    }
  } catch (error) {
    console.log("deleteAllCategories...", error);
    showError("Ошибка сети, попробуйте еще раз", dispatch);
  } finally {
    dispatch(categoriesActions.setIsLoadingCategories(false));
  }
};

// TODO:
// тут будет приходить не CategoryType а только name и parentID
export const createCategory =
  (formData: AddCategoryFormData): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const createdCategory = await categoriesApi.addCategory([
        {
          name: formData.name,
          parentId: Number(formData.parentId),
        },
      ]);

      if (createdCategory.length > 0) {
        dispatch(
          categoriesActions.setCategoriesActionStatus(ActionStatusEnum.SUCCESS)
        );
        dispatch(categoriesActions.addNewCategory(createdCategory[0]));
      } else {
        showError(
          "Не получилось добавить категорию, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("addCategory...", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };
//TODO: Нужно????
export const getCategoryById =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const categoryList = await categoriesApi.getCategoryById(id);

      if (categoryList.length === 0) {
        showError("Категория не найдена", dispatch);
      } else {
        dispatch(categoriesActions.setCurrentCategory(categoryList[0]));
      }
    } catch (error) {
      console.log("getCategoryById...", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };

export const deleteCategoryById =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const response = await categoriesApi.deleteCategoryById(id);
      if (response) {
        dispatch(
          categoriesActions.setCategoriesActionStatus(ActionStatusEnum.SUCCESS)
        );
        dispatch(categoriesActions.removeCategory(id));
      } else {
        showError(
          "Не получилось удалить категорию, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("deleteCategoryById...", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };

export const updateCategoryById =
  (category: CategoryType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setCategoryInEditProcess(category.id));
      const response = await categoriesApi.updateCategoryById(category);
      if (response) {
        dispatch(
          categoriesActions.setCategoriesActionStatus(ActionStatusEnum.SUCCESS)
        );
        dispatch(categoriesActions.replaceCategory(category));
      } else {
        showError(
          "Не получилось обновить категорию, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("updateCategoryById...", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(categoriesActions.setCategoryInEditProcess(null));
    }
  };

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  CategoriesActionTypes
>;
