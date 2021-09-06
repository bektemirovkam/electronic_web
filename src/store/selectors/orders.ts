import { AppStateType } from "./../store";
const getOrdersState = (state: AppStateType) => state.orders;

export const getOrdersListState =
  (searchText: string) => (state: AppStateType) =>
    getOrdersState(state).orders?.filter((order) =>
      order.title.toLowerCase().includes(searchText.toLowerCase())
    );

export const getOrdersLoadingState = (state: AppStateType) =>
  getOrdersState(state).ordersLoading;

export const getOrdersErrorState = (state: AppStateType) =>
  getOrdersState(state).ordersError;

export const getNewOrderSpecializationState = (state: AppStateType) =>
  getOrdersState(state).newOrderSpecialization;

export const getOrderActionStatusState = (state: AppStateType) =>
  getOrdersState(state).orderActionStatus;

export const getCurrentOrderState = (state: AppStateType) =>
  getOrdersState(state).currentOrder;
