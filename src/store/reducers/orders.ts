import { AttachmentOutType } from "../../models/Attachments";
import { ActionStatusEnum, OrderType } from "../../types";
import { OrdersActionTypes } from "../actions/orders";

const initialState = {
  orders: null as OrderType[] | null | undefined,
  ordersLoading: false,
  errorMessage: null as string | null,
  orderActionStatus: ActionStatusEnum.NEVER,
  currentOrder: null as OrderType | null,
  orderImages: [] as AttachmentOutType[],
  orderImageUploading: false,
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
    case "SET_CURRENT_ORDER":
    case "SET_ORDER_IMAGE_UPLOADING": {
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
    case "UPDATE_ORDER": {
      return {
        ...state,
        orders: state.orders?.map((order) => {
          if (order.id === action.payload.order.id) {
            return action.payload.order;
          }
          return order;
        }),
      };
    }
    case "REMOVE_ORDER": {
      return {
        ...state,
        orders: state.orders?.filter((order) => order.id !== action.payload.id),
      };
    }
    case "ADD_ORDER_IMAGE": {
      return {
        ...state,
        orderImages: [...state.orderImages, action.payload.image],
      };
    }

    case "REMOVE_ORDER_IMAGE": {
      return {
        ...state,
        orderImages: state.orderImages.filter(
          (image) => image.id !== action.payload.imageId
        ),
      };
    }
    default:
      return state;
  }
};

export default ordersReducer;
