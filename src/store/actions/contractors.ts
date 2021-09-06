import { ContractorType } from "./../../types";
// import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
// import { AppStateType } from "../store";

export const contractorActions = {
  setCurrentContractor: (currentContractor: ContractorType) => {
    return {
      type: "SET_CURRENT_CONTRACTOR",
      payload: { currentContractor },
    } as const;
  },
};

export type ContractorsActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof contractorActions>
>;

// type ThunkAcionType = ThunkAction<
//   Promise<void>,
//   AppStateType,
//   unknown,
//   ContractorsActionTypes
// >;
