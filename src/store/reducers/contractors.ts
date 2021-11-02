import { AttachmentOutType } from "./../../models/Attachments";
import { ActionStatusEnum } from "../../models/types";
import { ContractorsActionTypes } from "../actions/contractors";
import { ContractorType } from "../../models/Contractors";

const initialState = {
  contractors: null as ContractorType[] | null | undefined,
  currentContractor: null as ContractorType | null,
  contractorsLoading: false,
  contractorsActionStatus: ActionStatusEnum.NEVER,
  errorMessage: null as string | null,
  contractorImages: [] as AttachmentOutType[],
  contractorImageUploading: false,
  contractorAvatarUploading: false,
  contractorAvatars: [] as AttachmentOutType[],
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
    case "SET_CONTRACTORS":
    case "SET_CONTRACTOR_IMAGE_UPLOADING":
    case "SET_CONTRACTOR_AVATAR_UPLOADING": {
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

    case "SET_CONTRACTOR_IMAGES": {
      return {
        ...state,
        contractorImages: action.payload.images,
      };
    }

    case "ADD_CONTRACTOR_IMAGE": {
      return {
        ...state,
        contractorImages: [...state.contractorImages, ...action.payload.images],
      };
    }

    case "ADD_CONTRACTOR_AVATARS": {
      return {
        ...state,
        contractorAvatars: action.payload.images,
      };
    }

    case "REMOVE_CONTRACTOR_IMAGE": {
      return {
        ...state,
        contractorImages: state.contractorImages.filter(
          (image) => image.id !== action.payload.imageId
        ),
      };
    }
    case "REMOVE_CONTRACTOR_AVATAR": {
      return {
        ...state,
        contractorAvatars: [],
      };
    }

    case "CLEAR_CONTRACTOR_IMAGES": {
      return {
        ...state,
        contractorImages: [],
        contractorAvatars: [],
      };
    }
    default:
      return state;
  }
};

export default contractorsReducer;
