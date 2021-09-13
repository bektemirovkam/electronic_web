import {
  ActionStatusEnum,
  ContractorFullInfoType,
  ContractorType,
} from "./../../types";
import { ContractorsActionTypes } from "../actions/contractors";

const initialState = {
  contractors: null as ContractorType[] | null,
  currentContractor: null as ContractorFullInfoType | null,
  contractorsLoading: false,
  contractorsActionStatus: ActionStatusEnum.NEVER,
  errorMessage: null as string | null,
};

type initStateType = typeof initialState;

const contractorsReducer = (
  state = initialState,
  action: ContractorsActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_CURRENT_CONTRACTOR":
    case "SET_CONTRACTORS_LOADING":
    case "SET_CONTRACTORS_ACTION_STATUS":
    case "SET_CONTRACTORS_ERROR_MESSAGE":
    case "SET_CONTRACTORS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default contractorsReducer;
