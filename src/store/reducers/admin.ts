import { AdministratorOutType } from "../../models/Administrator";
import { ActionStatusEnum } from "../../models/types";
import { AdminActionTypes } from "../actions/admin";

const initialState = {
  isInit: false,
  isAuth: false,
  authErrorMessage: null as null | string,
  authLoading: false,
  adminLoading: false,
  adminErrorMessage: null as null | string,
  admins: [] as AdministratorOutType[],
  admin: null as null | AdministratorOutType,
  adminActionStatus: ActionStatusEnum.NEVER,
};

type initStateType = typeof initialState;

const adminReducer = (
  state = initialState,
  action: AdminActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_ADMIN_LOADING":
    case "SET_ADMIN_ERROR_MESSAGE":
    case "SET_AUTH_ERROR_MESSAGE":
    case "SET_AUTH_LOADING":
    case "SET_IS_AUTH":
    case "SET_IS_INIT":
    case "SET_ADMINS":
    case "SET_ADMIN_ACTION_STATUS":
    case "SET_CURRENT_ADMIN": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "BAN_ADMIN": {
      return {
        ...state,
        admins: state.admins.map((admin) => {
          if (admin.id === action.payload) {
            return { ...admin, isBlocked: true };
          } else {
            return admin;
          }
        }),
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
