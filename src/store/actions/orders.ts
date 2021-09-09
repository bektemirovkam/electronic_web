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
  setOrderActionStatus: (orderActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_ORDER_ACTION_STATUS",
      payload: { orderActionStatus },
    } as const;
  },
  setCurrentOrder: (currentOrder: OrderFullInfoType) => {
    return {
      type: "SET_CURRENT_ORDER",
      payload: { currentOrder },
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

// TODO: возвращаться должно не boolean а FullOrderInfo
export const createOrder =
  (formData: AddOrderFormData): ThunkAcionType =>
  async (dispatch) => {
    try {
      const response = await ordersApi.createOrder(formData);
      if (response) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(getOrders());
      } else {
        showError("Не удалось создать заявку, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("createOrder ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    }
  };

export const updateOrder =
  (formData: AddOrderFormData, id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const response = await ordersApi.updateOrder(formData, id);
      if (response) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(getOrders());
      } else {
        showError("Ошибка при редактировании заявки", dispatch);
      }
    } catch (error) {
      console.log("updateOrder ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
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
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(getOrders());
      } else {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.ERROR));
        dispatch(
          ordersActions.setOrdersErrorMessage("Ошибка при удалении заявки")
        );
      }
    } catch (error) {
      console.log("deleteOrder ===> ", error);
      dispatch(
        ordersActions.setOrdersErrorMessage("Ошибка сети, попробуйте еще раз")
      );
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
