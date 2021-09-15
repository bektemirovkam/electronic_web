import { createSelector } from "reselect";

import { OrdersQueryFilterType, OrderStatusEnum } from "../../types";
import { AppStateType } from "./../store";

const getOrdersState = (state: AppStateType) => state.orders;
const getOrdersListState = (state: AppStateType) => state.orders.orders;

export const getFilteredOrdersListState = (
  searchText: string,
  filter: OrdersQueryFilterType
) =>
  createSelector([getOrdersListState], (orders) => {
    return orders
      ?.filter((order) => {
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
  });

export const getOrdersLoadingState = (state: AppStateType) =>
  getOrdersState(state).ordersLoading;

export const getOrdersErrorMessageState = (state: AppStateType) =>
  getOrdersState(state).errorMessage;

export const getOrderActionStatusState = (state: AppStateType) =>
  getOrdersState(state).orderActionStatus;

export const getCurrentOrderState = (state: AppStateType) =>
  getOrdersState(state).currentOrder;

export const getAllOrdersCountState = createSelector(
  [getFilteredOrdersListState("", null)],
  (orders) => orders?.length
);

export const getActiveOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "active")],
  (orders) => orders?.length
);

export const getDeletedOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "deleted")],
  (orders) => orders?.length
);

export const getHistoryOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "archived")],
  (orders) => orders?.length
);
