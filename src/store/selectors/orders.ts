import { createSelector } from "reselect";
import moment from "moment";

import {
  OrderResultEnum,
  OrdersQueryFilterType,
  OrderStatusEnum,
} from "../../models/Orders";

import { AppStateType } from "./../store";
import { getMainCategoriesState } from "./categories";

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

export const getTodayOrdersCountState = createSelector(
  [getOrdersListState],
  (orders) => {
    if (orders) {
      const startDayTime = moment().startOf("day").valueOf();
      const endDayTime = moment().endOf("day").valueOf();
      const createdToday = orders.filter((order) => {
        return (
          order.creationDate > startDayTime && order.creationDate < endDayTime
        );
      });
      return createdToday.length;
    } else {
      return 0;
    }
  }
);

export const getTodayArchivedCountState = createSelector(
  [getOrdersListState],
  (orders) => {
    if (orders) {
      const startDayTime = moment().startOf("day").valueOf();
      const endDayTime = moment().endOf("day").valueOf();
      const archivedToday = orders.filter((order) => {
        return order.actualDate > startDayTime && order.actualDate < endDayTime;
      });
      return archivedToday.length;
    } else {
      return 0;
    }
  }
);

export const getSuccessResultCount = createSelector(
  [getFilteredOrdersListState("", "deleted", null, null)],
  (orders) => {
    if (orders) {
      const successCompleteOrders = orders.filter(
        (order) => order.result === OrderResultEnum.SUCCESS
      );
      return successCompleteOrders.length;
    }
    return 0;
  }
);

export const getFailResultCount = createSelector(
  [getFilteredOrdersListState("", "deleted", null, null)],
  (orders) => {
    if (orders) {
      const failCompleteOrders = orders.filter(
        (order) => order.result === OrderResultEnum.FAIL
      );
      return failCompleteOrders.length;
    }
    return 0;
  }
);

export const getOrdersByCategoriesState = createSelector(
  [getMainCategoriesState, getOrdersListState],
  (mainCategories, orders) => {
    if (mainCategories && orders) {
      const ordersByCategories = mainCategories.map((category) => {
        const ordersByCurrentCategory = orders.filter((order) => {
          const wantedCategory = order.categories.find(
            (orderCategory) => orderCategory.categoryId === category.id
          );

          if (wantedCategory) {
            return true;
          }
          return false;
        });

        return {
          categoryName: category.name,
          ordersCount: ordersByCurrentCategory.length,
        };
      });
      return ordersByCategories;
    } else {
      return [];
    }
  }
);

export const getOrderImagesState = (state: AppStateType) =>
  getOrdersState(state).orderImages;

export const getOrderImagesLoadingState = (state: AppStateType) =>
  getOrdersState(state).ordersLoading;
export const getOrderChatsState = (state: AppStateType) =>
  getOrdersState(state).orderChats;
