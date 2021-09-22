import { AttachmentOutType } from "./../../models/Attachments";
import { ActionStatusEnum } from "../../models/types";
import { ActionsCreatorsTypes } from "../../models/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";
import { Dispatch } from "redux";
import { contractorsApi } from "../../services/contractorsApi";
import { AttachmentType } from "../../models/Attachments";
import { attachmentsApi } from "../../services/attachmentsApi";
import {
  AddContractorFormDataType,
  ContractorType,
} from "../../models/Contractors";

export const contractorActions = {
  setCurrentContractor: (currentContractor: ContractorType | null) => {
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
  removeContractor: (contractorId: number) => {
    return {
      type: "REMOVE_CONTRACTOR",
      payload: { contractorId },
    } as const;
  },
  setContractorImageUploading: (contractorImageUploading: boolean) => {
    return {
      type: "SET_CONTRACTOR_IMAGE_UPLOADING",
      payload: { contractorImageUploading },
    } as const;
  },
  setContractorImages: (images: AttachmentOutType[]) => {
    return {
      type: "SET_CONTRACTOR_IMAGES",
      payload: { images },
    } as const;
  },
  addContractorImage: (images: AttachmentOutType[]) => {
    return {
      type: "ADD_CONTRACTOR_IMAGE",
      payload: { images },
    } as const;
  },
  removeContractorImage: (imageId: number) => {
    return {
      type: "REMOVE_CONTRACTOR_IMAGE",
      payload: { imageId },
    } as const;
  },
  clearContractorImages: () => {
    return {
      type: "CLEAR_CONTRACTOR_IMAGES",
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
        dispatch(contractorActions.setCurrentContractor(contractorsList[0]));
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

export const getContractors = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(contractorActions.setContractorsLoading(true));
    const contractors = await contractorsApi.getContractors();
    dispatch(contractorActions.setContractors(contractors));
  } catch (error) {
    console.log("getContracors ===> ", error);
    showError("Ошибка сети, попробуйте еще раз", dispatch);
  } finally {
    dispatch(contractorActions.setContractorsLoading(false));
  }
};

export const deleteContractor =
  (contractorId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorsLoading(true));
      const response = await contractorsApi.deleteContractor(contractorId);
      if (response) {
        dispatch(
          contractorActions.setContractorsActionstatus(ActionStatusEnum.SUCCESS)
        );
        dispatch(contractorActions.removeContractor(contractorId));
        dispatch(contractorActions.setCurrentContractor(null));
      } else {
        showError("Не удалось удалить заявку, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("deleteContractor ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorsLoading(false));
    }
  };

export const updateContractor =
  (contractor: AddContractorFormDataType, id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorsLoading(true));
      const contractors = await contractorsApi.updateContractor(contractor, id);
      if (contractors.length > 0) {
        dispatch(
          contractorActions.setContractorsActionstatus(ActionStatusEnum.SUCCESS)
        );
        dispatch(contractorActions.clearContractorImages());
        dispatch(contractorActions.setCurrentContractor(contractors[0]));
      } else {
        showError(
          "Не удалось сохранить изменения, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("getContracors ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorsLoading(false));
    }
  };

export const getContractorById =
  (contractorId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorsLoading(true));
      const contractors = await contractorsApi.getContractorById(contractorId);
      if (contractors.length === 0) {
        showError("Контрагент не найден", dispatch);
      } else {
        dispatch(contractorActions.setCurrentContractor(contractors[0]));
      }
    } catch (error) {
      console.log("getFullContractorInfo ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorsLoading(false));
    }
  };

export const addContractorImage =
  (image: AttachmentType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorImageUploading(true));
      const imageOut = await attachmentsApi.addAttachment(image);

      if (imageOut.length > 0) {
        dispatch(contractorActions.addContractorImage(imageOut));
      } else {
        showError(
          "Не удалось загрузить вложение, попробуйте еще раз",
          dispatch
        );
      }
    } catch (error) {
      console.log("addContractorImage ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorImageUploading(false));
    }
  };

export const removeContractorImage =
  (contractorId: number, imageId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorImageUploading(true));

      const response = await contractorsApi.removeContractorAttachment(
        contractorId,
        imageId
      );

      if (response) {
        dispatch(contractorActions.removeContractorImage(imageId));
      } else {
        showError("Не удалось удалить вложение, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("removeContractorImage ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorImageUploading(false));
    }
  };

export const removeNewContractorImage =
  (imageId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(contractorActions.setContractorImageUploading(true));

      const response = await attachmentsApi.removeAttachment(imageId);

      if (response) {
        dispatch(contractorActions.removeContractorImage(imageId));
      } else {
        showError("Не удалось удалить вложение, попробуйте еще раз", dispatch);
      }
    } catch (error) {
      console.log("removeNewContractorImage ===> ", error);
      showError("Ошибка сети, попробуйте еще раз", dispatch);
    } finally {
      dispatch(contractorActions.setContractorImageUploading(false));
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
