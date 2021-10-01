import { ThunkAction } from "redux-thunk";
import { ChatMessageOutType } from "../../models/Chats";
import { ActionsCreatorsTypes } from "../../models/types";
import { chatsApi } from "../../services/chatsApi";
import { AppStateType } from "../store";

export const chatsActions = {
  setErrorMessage: (errorMessage: string | null) => {
    return {
      type: "SET_CHATS_ERROR_MESSAGE",
      payload: { errorMessage },
    } as const;
  },
  setChatsLoading: (chatsLoading: boolean) => {
    return {
      type: "SET_CHATS_LOADING",
      payload: { chatsLoading },
    } as const;
  },
  setMessages: (messages: ChatMessageOutType[]) => {
    return {
      type: "SET_NEW_MESSAGES",
      payload: { messages },
    } as const;
  },
};

// chats/{orderId}/{chatId}

export const getChatMessages =
  (orderId: number, chatId: number): ThunkAcionType =>
  async (dispatch) => {
    try {
      dispatch(chatsActions.setChatsLoading(true));
      const messages = await chatsApi.getAllChatMessage(orderId, chatId);

      if (messages) {
        dispatch(chatsActions.setMessages(messages));
      } else {
        dispatch(
          chatsActions.setErrorMessage(
            "Не удалось загрузить сообщения, попробуйте еще раз"
          )
        );
      }
    } catch (error) {
      console.log("getChatMessages ---- ", error);
      dispatch(chatsActions.setErrorMessage("Ошибка сети, попробуйте еще раз"));
    } finally {
      dispatch(chatsActions.setChatsLoading(false));
    }
  };
export type ChatsActionTypes = ReturnType<
  ActionsCreatorsTypes<typeof chatsActions>
>;

type ThunkAcionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ChatsActionTypes
>;
