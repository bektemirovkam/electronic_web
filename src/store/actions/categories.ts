import { CategoryType } from "./../../types";
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

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  CategoriesActionTypes
>;
