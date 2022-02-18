import { AppStateType } from "../store";

const getAdminState = (state: AppStateType) => state.admin;

export const getIsAuthState = (state: AppStateType) =>
  getAdminState(state).isAuth;

export const getAuthLoadingState = (state: AppStateType) =>
  getAdminState(state).authLoading;

export const getAuthErrorMessageState = (state: AppStateType) =>
  getAdminState(state).authErrorMessage;

export const getIsInitState = (state: AppStateType) =>
  getAdminState(state).isInit;

export const getAdminLoadingState = (state: AppStateType) =>
  getAdminState(state).adminLoading;

export const getAdminErrorMessageState = (state: AppStateType) =>
  getAdminState(state).adminErrorMessage;

export const getAdminsState = (state: AppStateType) =>
  getAdminState(state).admins;

export const getAdminActionStatusState = (state: AppStateType) =>
  getAdminState(state).adminActionStatus;

export const getCurrentAdminState = (state: AppStateType) =>
  getAdminState(state).admin;
