import { ActionStatusEnum, CategoryType } from "./../../types";
import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
import { AppStateType } from "../store";
import { categoriesApi } from "../../services/categoriesApi";

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
  setCategoriesErrorMessage: (errorMessage: string) => {
    return {
      type: "SET_CATEGORIES_ERROR_MESSAGE",
      payload: { errorMessage },
    } as const;
  },
  setCategoryActionStatus: (categoryActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_CATEGORIES_ACTION_STATUS",
      payload: { categoryActionStatus },
    } as const;
  },
  setCurrentCategory: (currentCategory: CategoryType) => {
    return {
      type: "SET_CURRENT_CATEGORY",
      payload: { currentCategory },
    } as const;
  },
};

export type CategoriesActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof categoriesActions>
>;

export const getAllCategories = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(categoriesActions.setIsLoadingCategories(true));
    const categories = await categoriesApi.getAllCategories();
    dispatch(categoriesActions.setAllCategories(categories));
  } catch (error) {
    dispatch(
      categoriesActions.setCategoriesErrorMessage(
        "Ошибка сети, попробуйте еще раз"
      )
    );
  } finally {
    dispatch(categoriesActions.setIsLoadingCategories(false));
  }
};

export const deleteAllCategories = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(categoriesActions.setIsLoadingCategories(true));
    const response = await categoriesApi.deleteAllCategories();
    if (response) {
      dispatch(
        categoriesActions.setCategoryActionStatus(ActionStatusEnum.SUCCESS)
      );
    } else {
      dispatch(
        categoriesActions.setCategoryActionStatus(ActionStatusEnum.ERROR)
      );
    }
  } catch (error) {
    dispatch(
      categoriesActions.setCategoriesErrorMessage(
        "Ошибка сети, попробуйте еще раз"
      )
    );
  } finally {
    dispatch(categoriesActions.setIsLoadingCategories(false));
  }
};

export const addCategory =
  (categoryList: CategoryType[]): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const response = await categoriesApi.addCategory(categoryList);
      if (response) {
        dispatch(
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.SUCCESS)
        );
      } else {
        dispatch(
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.ERROR)
        );
      }
    } catch (error) {
      dispatch(
        categoriesActions.setCategoriesErrorMessage(
          "Ошибка сети, попробуйте еще раз"
        )
      );
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };

export const getCategoryById =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const categoryList = await categoriesApi.getCategoryById(id);

      if (categoryList.length === 0) {
        dispatch(
          categoriesActions.setCategoriesErrorMessage("Категория не найдена")
        );
      } else {
        dispatch(categoriesActions.setCurrentCategory(categoryList[0]));
      }
    } catch (error) {
      dispatch(
        categoriesActions.setCategoriesErrorMessage(
          "Ошибка сети, попробуйте еще раз"
        )
      );
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
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.SUCCESS)
        );
      } else {
        dispatch(
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.ERROR)
        );
      }
    } catch (error) {
      dispatch(
        categoriesActions.setCategoriesErrorMessage(
          "Ошибка сети, попробуйте еще раз"
        )
      );
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };

export const updateCategoryById =
  (category: CategoryType, id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(categoriesActions.setIsLoadingCategories(true));
      const response = await categoriesApi.updateCategoryById(category, id);
      if (response) {
        dispatch(
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.SUCCESS)
        );
      } else {
        dispatch(
          categoriesActions.setCategoryActionStatus(ActionStatusEnum.ERROR)
        );
      }
    } catch (error) {
      dispatch(
        categoriesActions.setCategoriesErrorMessage(
          "Ошибка сети, попробуйте еще раз"
        )
      );
    } finally {
      dispatch(categoriesActions.setIsLoadingCategories(false));
    }
  };

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  CategoriesActionTypes
>;
