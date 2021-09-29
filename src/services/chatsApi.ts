import { axios } from "../api/axios";
import { ChatMessageOutType, ChatType } from "../models/Chats";

export const chatsApi = {
  // chats/{orderId}

  getOrderChats: async (orderId: number): Promise<ChatType[]> => {
    const { data } = await axios.get<ChatType[]>(`/chats/${orderId}`);
    return data;
  },

  // chats/{orderId}/{chatId}

  getAllChatMessage: async (
    orderId: number,
    chatId: number
  ): Promise<ChatMessageOutType[]> => {
    const { data } = await axios.get<ChatMessageOutType[]>(
      `chats/${orderId}/${chatId}`
    );
    return data;
  },
};
