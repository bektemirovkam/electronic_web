import { OrdersQueryFilterType, OrderStatusEnum } from "../../types";
import { AppStateType } from "./../store";

const getOrdersState = (state: AppStateType) => state.orders;

export const getOrdersListState =
  (searchText: string, filter: OrdersQueryFilterType) =>
  (state: AppStateType) =>
    getOrdersState(state)
      .orders?.filter((order) => {
        if (filter === "active") {
          return order.orderStatus === OrderStatusEnum.NEW;
        } else if (filter === "deleted") {
          return order.orderStatus === OrderStatusEnum.DELETED;
        } else if (filter === "archived") {
          return order.orderStatus === OrderStatusEnum.ARCHIVED;
        }
        return true;
      })
      ?.filter((order) =>
        order.title.toLowerCase().includes(searchText.toLowerCase())
      );

export const getOrdersLoadingState = (state: AppStateType) =>
  getOrdersState(state).ordersLoading;

export const getOrdersErrorMessageState = (state: AppStateType) =>
  getOrdersState(state).errorMessage;

export const getOrderActionStatusState = (state: AppStateType) =>
  getOrdersState(state).orderActionStatus;

export const getCurrentOrderState = (state: AppStateType) =>
  getOrdersState(state).currentOrder;
