import { AppStateType } from "./../store";
const getContractorsState = (state: AppStateType) => state.contractors;

export const getCurrentContractorState = (state: AppStateType) =>
  getContractorsState(state).currentContractor;
