export type ChatType = {
  id: number;
  orderId: number;
  supplierId: number;
  customerId: number;
  supplierName: string;
  customerName: string;
};
export type ChatInType = {
  supplierId: number;
  customerId: number;
};

export enum ChatMessageEnum {
  TEXT = "TEXT",
  ATTACHMENT = "ATTACHMENT",
  SYSTEM = "SYSTEM",
}

export enum ChatTypesMessageEnum {
  TEXT = "TEXT",
  ATTACHMENT = "ATTACHMENT",
  SYSTEM = "SYSTEM",
  ADD_CHAT = "ADD_CHAT",
}

export type ChatMessageInType = {
  chatId: number;
  text: string;
};

export type ChatMessageOutType = {
  id?: number;
  chatId: number;
  senderId: number;
  recipientId: number;
  type: ChatTypesMessageEnum;
  timeStamp: number;
  text: string;
  senderName: string;
  recipientName: string;
  isDelivered: boolean;
  isRead: boolean;
};
