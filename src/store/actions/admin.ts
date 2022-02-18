import {
  AdministratorCredentialsType,
  AdministratorInType,
} from "./../../models/Administrator";
import { ActionStatusEnum } from "./../../models/types";
import { ThunkAction } from "redux-thunk";
import { AdministratorOutType } from "../../models/Administrator";
import { ActionsCreatorsTypes } from "../../models/types";
import { AppStateType } from "../store";
import { adminsApi } from "../../services/adminsApi";

export const adminActions = {
  setIsAuth: (isAuth: boolean) => {
    return {
      type: "SET_IS_AUTH",
      payload: { isAuth },
    } as const;
  },
  setAuthErrorMessage: (authErrorMessage: string | null) => {
    return {
      type: "SET_AUTH_ERROR_MESSAGE",
      payload: { authErrorMessage },
    } as const;
  },
  setAuthLoading: (authLoading: boolean) => {
    return {
      type: "SET_AUTH_LOADING",
      payload: { authLoading },
    } as const;
  },
  setIsInit: (isInit: boolean) => {
    return {
      type: "SET_IS_INIT",
      payload: { isInit },
    } as const;
  },
  setAdminLoading: (adminLoading: boolean) => {
    return {
      type: "SET_ADMIN_LOADING",
      payload: { adminLoading },
    } as const;
  },
  setAdminErrorMessage: (adminErrorMessage: string | null) => {
    return {
      type: "SET_ADMIN_ERROR_MESSAGE",
      payload: { adminErrorMessage },
    } as const;
  },
  setAdmins: (admins: AdministratorOutType[]) => {
    return {
      type: "SET_ADMINS",
      payload: { admins },
    } as const;
  },
  setAdminActionStatus: (adminActionStatus: ActionStatusEnum) => {
    return {
      type: "SET_ADMIN_ACTION_STATUS",
      payload: { adminActionStatus },
    };
  },
  banAdmin: (id: number) => {
    return {
      type: "BAN_ADMIN",
      payload: id,
    } as const;
  },
  setCurrentAdmin: (admin: AdministratorOutType | null) => {
    return {
      type: "SET_CURRENT_ADMIN",
      payload: { admin },
    } as const;
  },
};

export const clearAdminState = (): ThunkAcionType => async (dispatch) => {
  dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.NEVER));
  dispatch(adminActions.setAdminErrorMessage(null));
};

export const createAdmin =
  (formData: AdministratorInType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAdminLoading(true));

      const resp = await adminsApi.createAdmin(formData);
      if (resp.length > 0) {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.SUCCESS));
      } else {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
        dispatch(
          adminActions.setAdminErrorMessage(
            "Не удалось создать администратора! Попробуйте еще раз."
          )
        );
      }
    } catch (error) {
      console.log("createAdmin error ---> ", error);
      dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
      dispatch(
        adminActions.setAdminErrorMessage("Ошибка сети! Попробуйте еще раз.")
      );
    } finally {
      dispatch(adminActions.setAdminLoading(false));
    }
  };

export const updatedAdmin =
  (formData: AdministratorInType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAdminLoading(true));

      const resp = await adminsApi.createAdmin(formData);
      if (resp.length > 0) {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.SUCCESS));
      } else {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
        dispatch(
          adminActions.setAdminErrorMessage(
            "Не удалось обновоить администратора! Попробуйте еще раз."
          )
        );
      }
    } catch (error) {
      console.log("updatedAdmin error ---> ", error);
      dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
      dispatch(
        adminActions.setAdminErrorMessage("Ошибка сети! Попробуйте еще раз.")
      );
    } finally {
      dispatch(adminActions.setAdminLoading(false));
    }
  };

export const getAllAdmins = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(adminActions.setAdminErrorMessage(null));
    dispatch(adminActions.setAdminLoading(true));

    const admins = await adminsApi.getAllAdmin();

    console.log("admins --> ", admins);

    dispatch(adminActions.setAdmins(admins));
  } catch (error) {
    dispatch(
      adminActions.setAdminErrorMessage("Ошибка сети! Попробуйте еще раз.")
    );
  } finally {
    dispatch(adminActions.setAdminLoading(false));
  }
};

export const banAdmin =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAdminLoading(true));

      const resp = await adminsApi.banAdmin(id);

      if (resp) {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(adminActions.banAdmin(id));
      } else {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
        dispatch(
          adminActions.setAdminErrorMessage(
            "Не удалось удалить администратора! Попробуйте еще раз."
          )
        );
      }
    } catch (error) {
      dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
      dispatch(
        adminActions.setAdminErrorMessage("Ошибка сети! Попробуйте еще раз.")
      );
    } finally {
      dispatch(adminActions.setAdminLoading(false));
    }
  };

export const auth =
  (formData: AdministratorCredentialsType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAuthErrorMessage(null));
      dispatch(adminActions.setAuthLoading(true));

      const admin = await adminsApi.checkAdmin(formData);

      console.log("admin ---> ", admin);

      // if (admin.length > 0) {
      if (admin) {
        dispatch(adminActions.setCurrentAdmin(admin[0]));
        localStorage.setItem("isAuth", "true");
        dispatch(adminActions.setIsAuth(true));
      } else {
        dispatch(adminActions.setAuthErrorMessage("Ошибка авторизации"));
      }
    } catch (error) {
      dispatch(adminActions.setAuthErrorMessage("Ошибка авторизации"));
    } finally {
      dispatch(adminActions.setAuthLoading(false));
    }
  };

export type AdminActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof adminActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  AdminActionTypes
>;
