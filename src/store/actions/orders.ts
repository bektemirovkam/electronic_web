import { ActionStatusEnum } from "../../models/types";
import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../models/types";
import { AppStateType } from "../store";
import { ordersApi } from "../../services/ordersApi";
import { Dispatch } from "redux";
import { AttachmentOutType, AttachmentType } from "../../models/Attachments";
import { attachmentsApi } from "../../services/attachmentsApi";
import { AddOrderFormData, OrderType } from "../../models/Orders";

// TODO: добавление/удаление вложений при создании и редактировании

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
  setCurrentOrder: (currentOrder: OrderType | null) => {
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
  updateOrder: (order: OrderType) => {
    return {
      type: "UPDATE_ORDER",
      payload: { order },
    } as const;
  },
  setOrderImageUploading: (orderImageUploading: boolean) => {
    return {
      type: "SET_ORDER_IMAGE_UPLOADING",
      payload: { orderImageUploading },
    } as const;
  },
  addOrderImage: (images: AttachmentOutType[]) => {
    return {
      type: "ADD_ORDER_IMAGE",
      payload: { images },
    } as const;
  },
  setOrderImages: (images: AttachmentOutType[]) => {
    return {
      type: "SET_ORDER_IMAGES",
      payload: { images },
    } as const;
  },
  removeOrderImage: (imageId: number) => {
    return {
      type: "REMOVE_ORDER_IMAGE",
      payload: { imageId },
    } as const;
  },
  clearOrderImages: () => {
    return {
      type: "CLEAR_ORDER_IMAGES",
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
        dispatch(ordersActions.addNewOrder(orders[0]));
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
      const orders = await ordersApi.updateOrder(order, id);
      if (orders.length > 0) {
        dispatch(ordersActions.setOrderActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(ordersActions.clearOrderImages());
        dispatch(ordersActions.setCurrentOrder(orders[0]));
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

export const getOrderById =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrdersLoading(true));
      const orders = await ordersApi.getOrderById(id);
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

export const addOrderImage =
  (image: AttachmentType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrderImageUploading(true));
      const imageOut = await attachmentsApi.addAttachment(image);

      if (imageOut.length > 0) {
        dispatch(ordersActions.addOrderImage(imageOut));
      } else {
        showError(
          "Не удалось загрузить вложение, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("addOrderImage ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(ordersActions.setOrderImageUploading(false));
    }
  };

export const removeOrderImage =
  (orderId: number, imageId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrderImageUploading(true));

      const response = await ordersApi.removeOrderAttachment(orderId, imageId);

      if (response) {
        dispatch(ordersActions.removeOrderImage(imageId));
      } else {
        showError("Не удалось удалить вложение, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("getFullOrderInfo ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(ordersActions.setOrderImageUploading(false));
    }
  };

export const removeNewOrderImage =
  (imageId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(ordersActions.setOrderImageUploading(true));

      const response = await attachmentsApi.removeAttachment(imageId);

      if (response) {
        dispatch(ordersActions.removeOrderImage(imageId));
      } else {
        showError("Не удалось удалить вложение, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("getFullOrderInfo ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(ordersActions.setOrderImageUploading(false));
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
