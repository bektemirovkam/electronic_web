import { ChatMessageOutType } from "../../models/Chats";
import { ChatsActionTypes } from "../actions/chats";

const initialState = {
  errorMessage: null as null | string,
  chatsLoading: false,
  messages: [] as ChatMessageOutType[],
};

type initStateType = typeof initialState;

const chatsReducer = (
  state = initialState,
  action: ChatsActionTypes
): initStateType => {
  switch (action.type) {
    case "SET_CHATS_ERROR_MESSAGE":
    case "SET_CHATS_LOADING": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_NEW_MESSAGES": {
      return {
        ...state,
        messages: action.payload.messages,
      };
    }
    default:
      return state;
  }
};

export default chatsReducer;
