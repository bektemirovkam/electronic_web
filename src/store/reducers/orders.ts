import {
  ActionStatusEnum,
  OrderType,
  StateSpecializationType,
  OrderFullInfoType,
} from "../../types";
import { OrdersActionTypes } from "../actions/orders";

const initialState = {
  orders: null as OrderType[] | null,
  ordersLoading: false,
  errorMessage: null as string | null,
  newOrderSpecialization: {} as StateSpecializationType,
  orderActionStatus: ActionStatusEnum.NEVER,
  currentOrder: null as OrderFullInfoType | null,
};

type initStateType = typeof initialState;

const ordersReducer = (
  state = initialState,
  action: OrdersActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_ORDERS":
    case "SET_ORDERS_LOADING":
    case "SET_ORDERS_ERROR":
    case "SET_ORDER_ACTION_STATUS":
    case "SET_CURRENT_ORDER": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_NEW_ORDER_SPECIALIZATION": {
      return {
        ...state,
        newOrderSpecialization: {
          ...state.newOrderSpecialization,
          ...action.payload,
        },
      };
    }
    case "REMOVE_ORDER_SPECIALIZATION_ITEM": {
      const updatedSpecialization = Object.keys(
        state.newOrderSpecialization
      ).reduce((prev, key) => {
        if (key !== action.payload) {
          return { ...prev, [key]: state.newOrderSpecialization[key] };
        } else {
          return prev;
        }
      }, {});

      return {
        ...state,
        newOrderSpecialization: updatedSpecialization,
      };
    }

    case "CLEAR_ORDER_SPECIALIZATION": {
      return {
        ...state,
        newOrderSpecialization: {},
      };
    }
    default:
      return state;
  }
};

export default ordersReducer;
