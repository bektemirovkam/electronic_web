import {
  ActionStatusEnum,
  addOrderFormData,
  OrderType,
  StateSpecializationType,
} from "./../../types";
import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
import { AppStateType } from "../store";
import { ordersApi } from "../../services/ordersApi";

export const ordersActions = {
  setOrders: (orders: OrderType[]) => {
    return {
      type: "SET_ORDERS",
      payload: { orders },
    } as const;
  },
  setOrdersLoading: (ordersLoading: boolean) => {
    return {
      type: "SET_ORDERS_LOADING",
      payload: { ordersLoading },
    } as const;
  },
  setOrdersError: (ordersError: string) => {
    return {
      type: "SET_ORDERS_ERROR",
      payload: { ordersError },
    } as const;
  },
  setOrderSpecialization: (newOrderSpecialization: StateSpecializationType) => {
    return {
      type: "SET_NEW_ORDER_SPECIALIZATION",
      payload: newOrderSpecialization,
    } as const;
  },
  clearOrderSpecialization: () => {
    return {
      type: "CLEAR_ORDER_SPECIALIZATION",
    } as const;
  },
  removeOrderSpecializationItem: (specializationName: string) => {
    return {
      type: "REMOVE_ORDER_SPECIALIZATION_ITEM",
      payload: specializationName,
    } as const;
  },
  setActionStatusSuccess: (orderActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_ORDER_ACTION_STATUS",
      payload: { orderActionStatus },
    } as const;
  },
  setCurrentOrder: (currentOrder: OrderType) => {
    return {
      type: "SET_CURRENT_ORDER",
      payload: { currentOrder },
    } as const;
  },
};

export const getOrders = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(ordersActions.setOrdersLoading(true));
    const orders = await ordersApi.getOrders();
    dispatch(ordersActions.setOrders(orders));
  } catch (error) {
    console.log("getOrders ===> ", error);
    dispatch(ordersActions.setOrdersError("Ошибка сети, попробуйте еще раз"));
  } finally {
    dispatch(ordersActions.setOrdersLoading(false));
  }
};

export const createOrder =
  (formData: addOrderFormData): ThunkAcionType =>
  async (dispatch) => {
    try {
      const response = await ordersApi.createOrder(formData);
      if (response) {
        dispatch(
          ordersActions.setActionStatusSuccess(ActionStatusEnum.SUCCESS)
        );
        dispatch(getOrders());
      } else {
        dispatch(ordersActions.setActionStatusSuccess(ActionStatusEnum.ERROR));
      }
    } catch (error) {
      console.log("createOrder ===> ", error);
      dispatch(ordersActions.setOrdersError("Ошибка сети, попробуйте еще раз"));
    }
  };

export const updateOrder =
  (formData: addOrderFormData, id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const response = await ordersApi.updateOrder(formData, id);
      if (response) {
        dispatch(
          ordersActions.setActionStatusSuccess(ActionStatusEnum.SUCCESS)
        );
        dispatch(getOrders());
      } else {
        dispatch(ordersActions.setActionStatusSuccess(ActionStatusEnum.ERROR));
        dispatch(
          ordersActions.setOrdersError("Ошибка при редактировании заявки")
        );
      }
    } catch (error) {
      console.log("updateOrder ===> ", error);
      dispatch(ordersActions.setOrdersError("Ошибка сети, попробуйте еще раз"));
    } finally {
      dispatch(ordersActions.setOrdersLoading(true));
    }
  };

export const deleteOrder =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const response = await ordersApi.deleteOrder(id);
      if (response) {
        dispatch(
          ordersActions.setActionStatusSuccess(ActionStatusEnum.SUCCESS)
        );
        dispatch(getOrders());
      } else {
        dispatch(ordersActions.setActionStatusSuccess(ActionStatusEnum.ERROR));
        dispatch(ordersActions.setOrdersError("Ошибка при удалении заявки"));
      }
    } catch (error) {
      console.log("deleteOrder ===> ", error);
      dispatch(ordersActions.setOrdersError("Ошибка сети, попробуйте еще раз"));
    } finally {
      dispatch(ordersActions.setOrdersLoading(false));
    }
  };

export type OrdersActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof ordersActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  OrdersActionTypes
>;
