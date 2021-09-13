import { AppStateType } from "./../store";
const getContractorsState = (state: AppStateType) => state.contractors;

export const getCurrentContractorState = (state: AppStateType) =>
  getContractorsState(state).currentContractor;

export const getContractorsListState = (state: AppStateType) =>
  getContractorsState(state).contractors;
export const getContractorsLoadingState = (state: AppStateType) =>
  getContractorsState(state).contractorsLoading;
export const getContractorsActionStatusState = (state: AppStateType) =>
  getContractorsState(state).contractorsActionStatus;
export const getContractorsErrorMessage = (state: AppStateType) =>
  getContractorsState(state).errorMessage;
