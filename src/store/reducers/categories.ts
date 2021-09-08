import { ActionStatusEnum } from "./../../types";
import { CategoryType } from "../../types";
import { CategoriesActionTypes } from "../actions/categories";

const initialState = {
  categories: null as CategoryType[] | null | undefined,
  isLoadingCategories: false,
  errorMessage: null as string | null,
  categoriesActionStatus: ActionStatusEnum.NEVER,
  currentCategory: null as CategoryType | null,
  categoryInProcessEdit: null as number | null,
};

type initStateType = typeof initialState;

const categoriesReducer = (
  state = initialState,
  action: CategoriesActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_CATEGORIES":
    case "SET_IS_LOADING_CATEGORIES":
    case "SET_CATEGORIES_ERROR_MESSAGE":
    case "SET_CATEGORIES_ACTION_STATUS":
    case "SET_CURRENT_CATEGORY":
    case "SET_CATEGORY_IN_EDIT_PROCESS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "REPLACE_CATEGORY": {
      const newCategoriesList = state.categories?.map((category) => {
        if (category.id === action.payload.category.id) {
          return action.payload.category;
        }
        return category;
      });
      return {
        ...state,
        categories: newCategoriesList,
      };
    }

    case "REMOVE_CATEGORY": {
      const newCategoriesList = state.categories?.filter(
        (category) => category.id !== action.payload.id
      );
      return {
        ...state,
        categories: newCategoriesList,
      };
    }

    case "CLEAR_CATEGORIES": {
      return {
        ...state,
        categories: null,
      } as const;
    }

    case "ADD_NEW_CATEGORY": {
      return {
        ...state,
        categories: state.categories
          ? [...state.categories, action.payload.category]
          : [action.payload.category],
      };
    }
    default:
      return state;
  }
};

export default categoriesReducer;
