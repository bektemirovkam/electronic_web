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
    } as const;
  },
  changeBanStatus: (id: number, value: boolean) => {
    return {
      type: "CHANGE_BAN_STATUS",
      payload: { id, value },
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
      console.log("resp --> ", resp);
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
      dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
      dispatch(
        adminActions.setAdminErrorMessage("Ошибка сети! Попробуйте еще раз.")
      );
    } finally {
      dispatch(adminActions.setAdminLoading(false));
    }
  };

export const updateAdmin =
  (id: number, formData: AdministratorInType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAdminLoading(true));

      const resp = await adminsApi.updateAdmin(id, formData);

      if (resp.length > 0) {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(adminActions.setCurrentAdmin(resp[0]));
      } else {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.ERROR));
        dispatch(
          adminActions.setAdminErrorMessage(
            "Не удалось обновоить администратора! Попробуйте еще раз."
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

export const getAllAdmins = (): ThunkAcionType => async (dispatch) => {
  try {
    dispatch(adminActions.setAdminErrorMessage(null));
    dispatch(adminActions.setAdminLoading(true));

    const admins = await adminsApi.getAllAdmin();

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
        dispatch(adminActions.changeBanStatus(id, true));
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

export const unBan =
  (id: number, formData: AdministratorInType): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(adminActions.setAdminLoading(true));

      const resp = await adminsApi.updateAdmin(id, formData);
      console.log("resp --> ", resp);
      if (resp) {
        dispatch(adminActions.setAdminActionStatus(ActionStatusEnum.SUCCESS));
        dispatch(adminActions.changeBanStatus(id, false));
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

      if (admin) {
        dispatch(adminActions.setCurrentAdmin(admin));
        localStorage.setItem("adminId", String(admin.id));
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

export const checkMe =
  (id: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      const resp = await adminsApi.getAdminById(id);
      if (resp.length > 0 && !resp[0].isBlocked) {
        dispatch(adminActions.setCurrentAdmin(resp[0]));
        dispatch(adminActions.setIsAuth(true));
      } else {
        dispatch(adminActions.setAuthErrorMessage("Ошибка авторизации"));
        dispatch(adminActions.setIsAuth(false));
      }
    } catch (error) {
      dispatch(adminActions.setAuthErrorMessage("Ошибка авторизации"));
      dispatch(adminActions.setIsAuth(false));
    } finally {
      dispatch(adminActions.setIsInit(true));
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
