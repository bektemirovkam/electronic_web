// import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../models/types";
// import { AppStateType } from "../store";

export const authActions = {
  set: () => {
    return {
      type: "asdas",
    } as const;
  },
};

export type AuthActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof authActions>
>;

// type ThunkAcionType = ThunkAction<
//   Promise<void>,
//   AppStateType,
//   unknown,
//   AuthActionTypes
// >;
