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

export type ChatMessageType = {
  id: number;
  chatId: number;
  date: number;
  isDelivered: boolean;
  isRead: boolean;
  message: string;
  customerId: number;
  supplierId: number;
  messageType: ChatMessageEnum;
};

export type ChatMessageInType = {
  chatId: number;
  text: string;
};

export type ChatMessageOutType = {
  chatId: number;
  senderId: number;
  recipientId: number;
  type: ChatMessageEnum;
  timeStamp: number;
  text: string;
};
