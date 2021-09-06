import { AuthActionTypes } from "../actions/auth";

const initialState = {};

type initStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): initStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
