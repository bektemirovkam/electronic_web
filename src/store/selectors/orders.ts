import { createSelector } from "reselect";
import { OrdersQueryFilterType, OrderStatusEnum } from "../../models/Orders";

import { AppStateType } from "./../store";

const getOrdersState = (state: AppStateType) => state.orders;
const getOrdersListState = (state: AppStateType) => state.orders.orders;

export const getFilteredOrdersListState = (
  searchText: string,
  filter: OrdersQueryFilterType,
  categoryId: string | null,
  contractorId: string | null
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
      )
      ?.filter((order) => {
        if (categoryId) {
          return Boolean(
            order.categories.find((category) => {
              return (
                category.categoryId === Number(categoryId) ||
                category.parentId === Number(categoryId)
              );
            })
          );
        }
        return true;
      })
      ?.filter((order) => {
        if (contractorId) {
          return order.customerId === Number(contractorId);
        }
        return true;
      });
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
  [getFilteredOrdersListState("", null, null, null)],
  (orders) => orders?.length
);

export const getActiveOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "active", null, null)],
  (orders) => orders?.length
);

export const getDeletedOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "deleted", null, null)],
  (orders) => orders?.length
);

export const getHistoryOrdersCountState = createSelector(
  [getFilteredOrdersListState("", "archived", null, null)],
  (orders) => orders?.length
);

export const getOrderImagesState = (state: AppStateType) =>
  getOrdersState(state).orderImages;

export const getOrderImagesLoadingState = (state: AppStateType) =>
  getOrdersState(state).ordersLoading;
export const getOrderChatsState = (state: AppStateType) =>
  getOrdersState(state).orderChats;
