import { ContractorType } from "./../../types";
import { ContractorsActionTypes } from "../actions/contractors";

const initialState = {
  currentContractor: null as ContractorType | null,
};

type initStateType = typeof initialState;

const contractorsReducer = (
  state = initialState,
  action: ContractorsActionTypes
): initStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default contractorsReducer;
