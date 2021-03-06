import { AttachmentOutType } from "./Attachments";
import { OrderStatusEnum } from "./Orders";

export type ChatType = {
  id: number;
  orderId: number;
  supplierId: number;
  customerId: number;
  supplierName: string;
  customerName: string;
  orderTitle: string;
  lastMessage: string;
  orderStatus: OrderStatusEnum;
  customerAvatar: AttachmentOutType;
  supplierAvatar: AttachmentOutType;
  supplierUnread: number;
  customerUnread: number;
  lastMessageDate: number;
  isDeletedBySupplier: boolean;
  deletedBySupplierAt: number;
  isDeletedByCustomer: boolean;
  deletedByCustomerAt: number;
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

export enum ChatMessageAttachmentTypesEnum {
  DOCUMENT = "DOCUMENT",
  PICTURE = "PICTURE",
  VIDEO = "VIDEO",
  NONE = "NONE",
}

export type ChatMessageInType = {
  chatId: number;
  text: string;
  type?: ChatTypesMessageEnum;
  attachmentType: ChatMessageAttachmentTypesEnum;
};

export type ChatMessageOutType = {
  id: number;
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
  attachmentType: ChatMessageAttachmentTypesEnum;
  attachmentName: string;
  isDeleted: boolean;
};
