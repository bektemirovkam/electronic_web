import {
  ActionStatusEnum,
  AddContractorFormDataType,
  ContractorFullInfoType,
  ContractorType,
} from "./../../types";
// import { ThunkAction } from "redux-thunk";
import { ActionsCreatorsTypes } from "../../types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";
import { Dispatch } from "redux";
import { contractorsApi } from "../../services/contractorsApi";
// import { AppStateType } from "../store";

export const contractorActions = {
  setCurrentContractor: (currentContractor: ContractorFullInfoType) => {
    return {
      type: "SET_CURRENT_CONTRACTOR",
      payload: { currentContractor },
    } as const;
  },
  setContractorsLoading: (contractorsLoading: boolean) => {
    return {
      type: "SET_CONTRACTORS_LOADING",
      payload: { contractorsLoading },
    } as const;
  },
  setContractorsActionstatus: (contractorsActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_CONTRACTORS_ACTION_STATUS",
      payload: { contractorsActionStatus },
    } as const;
  },
  setContractorsErrorMessage: (errorMessage: string | null) => {
    return {
      type: "SET_CONTRACTORS_ERROR_MESSAGE",
      payload: { errorMessage },
    } as const;
  },
  setContractors: (contractors: ContractorType[]) => {
    return {
      type: "SET_CONTRACTORS",
      payload: { contractors },
    } as const;
  },
};

const showError = (text: string, dispatch: Dispatch) => {
  dispatch(
    contractorActions.setContractorsActionstatus(ActionStatusEnum.ERROR)
  );
  dispatch(contractorActions.setContractorsErrorMessage(text));
};

export const createContractorProfile =
  (formData: AddContractorFormDataType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorsLoading(true));
      const contractorsList = await contractorsApi.createContractor(formData);
      if (contractorsList.length > 0) {
        dispatch(
          contractorActions.setContractorsActionstatus(ActionStatusEnum.SUCCESS)
        );
      } else {
        showError("Не удалось создать профиль, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("createContractorProfile ERROR ===>", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorsLoading(false));
    }
  };

export type ContractorsActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof contractorActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ContractorsActionTypes
>;
