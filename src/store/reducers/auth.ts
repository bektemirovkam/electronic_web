import { AuthActionTypes } from "../actions/auth";

const initialState = {
  isAuth: false,
  isInit: false,
};

type initStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_IS_AUTH": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "SET_IS_INIT": {
      return {
        ...state,
        isInit: true,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
