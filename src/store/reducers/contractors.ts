import { ActionStatusEnum, ContractorType } from "./../../types";
import { ContractorsActionTypes } from "../actions/contractors";

const initialState = {
  contractors: null as ContractorType[] | null | undefined,
  currentContractor: null as ContractorType | null,
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

    case "REMOVE_CONTRACTOR": {
      return {
        ...state,
        contractors: state.contractors?.filter(
          (contractor) => contractor.id !== action.payload.contractorId
        ),
      };
    }
    default:
      return state;
  }
};

export default contractorsReducer;
