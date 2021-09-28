import { axios } from "../api/axios";
import { ChatMessageType, ChatType } from "../models/Chats";

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
  ): Promise<ChatMessageType[]> => {
    const { data } = await axios.get<ChatMessageType[]>(
      `chats/${orderId}/${chatId}`
    );
    return data;
  },
};
