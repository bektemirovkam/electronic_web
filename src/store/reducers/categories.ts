import { CategoryType } from "../../types";
import { CategoriesActionTypes } from "../actions/categories";

const initialState = {
  categories: null as CategoryType[] | null,
  isLoadingCategories: false,
  errorMessage: null as string | null,
};

type initStateType = typeof initialState;

const categoriesReducer = (
  state = initialState,
  action: CategoriesActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_CATEGORIES":
    case "SET_IS_LOADING_CATEGORIES":
    case "SET_CATEGORIES_ERROR_MESSAGE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default categoriesReducer;
