import { AppStateType } from "./../store";

const getChatsState = (state: AppStateType) => state.chats;

export const getChatErrorMessageState = (state: AppStateType) =>
  getChatsState(state).errorMessage;
export const getChatLoadinState = (state: AppStateType) =>
  getChatsState(state).chatsLoading;
export const getChatMessagesState = (state: AppStateType) =>
  getChatsState(state).messages;
