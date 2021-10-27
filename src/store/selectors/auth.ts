import { AppStateType } from "../store";

const getAuthState = (state: AppStateType) => state.auth;

export const getIsAuthState = (state: AppStateType) =>
  getAuthState(state).isAuth;

export const getIsInitState = (state: AppStateType) =>
  getAuthState(state).isInit;
