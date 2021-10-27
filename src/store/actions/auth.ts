// import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../models/types";
// import { AppStateType } from "../store";

export const authActions = {
  setIsAuth: (isAuth: boolean) => {
    return {
      type: "SET_IS_AUTH",
      payload: { isAuth },
    } as const;
  },
  setIsInit: () => {
    return {
      type: "SET_IS_INIT",
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
