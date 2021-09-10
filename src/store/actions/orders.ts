import {
  ActionStatusEnum,
  AddOrderFormData,
  OrderFullInfoType,
  OrderType,
  StateSpecializationType,
} from "./../../types";
import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
import { AppStateType } from "../store";
import { ordersApi } from "../../services/ordersApi";
import { Dispatch } from "redux";

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
  setOrdersErrorMessage: (errorMessage: string | null) => {
    return {
      type: "SET_ORDERS_ERROR",
      payload: { errorMessage },
    } as const;
  },
  setOrderActionStatus: (orderActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_ORDER_ACTION_STATUS",
      payload: { orderActionStatus },
    } as const;
  },
  setCurrentOrder: (currentOrder: OrderFullInfoType | null) => {
    return {
      type: "SET_CURRENT_ORDER",
      payload: { currentOrder },
    } as const;
  },
  replaceOrder: (order: OrderType) => {
    return {
      type: "REPLACE_ORDER",
      payload: { order },
    } as const;
  },
  removeOrder: (id: number) => {
    return {
      type: "REMOVE_ORDER",
      payload: { id },
    } as const;
  },
  addNewOrder: (order: OrderType) => {
    return {
      type: "ADD_NEW_ORDER",
      payload: { order },
    } as const;
  },
};

const showError = (text: string, dispatch: Dispatch) => {
  dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.ERROR));
  dispatch(ordersActions.setOrdersErrorMessage(text));
};

export const getOrders = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(ordersActions.setOrdersLoading(true));
    const orders = await ordersApi.getOrders();
    dispatch(ordersActions.setOrders(orders));
  } catch (error) {
    console.log("getOrders ===> ", error);
    showError("Ошибка сети, попробуйте еще раз", dispatch);
  } finally {
    dispatch(ordersActions.setOrdersLoading(false));
  }
};

export const createOrder =
  (formData: AddOrderFormData): ThunkAcionType =>
  async (dispatch) => {
    try {
      const orders = await ordersApi.createOrder(formData);
      if (orders.length > 0) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(ordersActions.setCurrentOrder(orders[0]));
      } else {
        showError("Не удалось создать заявку, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("createOrder ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    }
  };

export const updateOrder =
  (order: AddOrderFormData, id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const response = await ordersApi.updateOrder(order, id);
      if (response) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
      } else {
        showError(
          "Не удалось сохранить изменения, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("updateOrder ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(ordersActions.setOrdersLoading(false));
    }
  };

export const deleteOrder =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const response = await ordersApi.deleteOrder(id);
      if (response) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(ordersActions.removeOrder(id));
        dispatch(ordersActions.setCurrentOrder(null));
      } else {
        showError("Не удалось удалить заявку, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("deleteOrder ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(ordersActions.setOrdersLoading(false));
    }
  };

export const getFullOrderInfo =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const orders = await ordersApi.getFullOrderInfo(id);
      if (orders.length === 0) {
        showError("Заявка не найдена", dispatch);
      } else {
        dispatch(ordersActions.setCurrentOrder(orders[0]));
      }
    } catch (error) {
      console.log("getFullOrderInfo ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
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
