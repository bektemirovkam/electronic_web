import {
  ActionStatusEnum,
  OrderType,
  StateSpecializationType,
  OrderFullInfoType,
} from "../../types";
import { OrdersActionTypes } from "../actions/orders";

const initialState = {
  orders: null as OrderType[] | null | undefined,
  ordersLoading: false,
  errorMessage: null as string | null,
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

    case "ADD_NEW_ORDER": {
      return {
        ...state,
        orders: state.orders
          ? [...state.orders, action.payload.order]
          : [action.payload.order],
      };
    }

    case "REMOVE_ORDER": {
      return {
        ...state,
        orders: state.orders?.filter((order) => order.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default ordersReducer;
