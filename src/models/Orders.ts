import { AttachmentInType, AttachmentOutType } from "./Attachments";
import { CategoryInType, CategoryOutType } from "./Categories";
import { ContractorInType, ContractorOutType } from "./Contractors";

export type OrderType = {
  id: number;
  creationDate: number;
  actualDate: number;
  comment?: string;
  title: string;
  description?: string;
  totalSum: number;
  orderStatus: OrderStatusEnum;
  customerId: number;
  customerPhoneNumber: string;
  categories: CategoryOutType[];
  contractors: ContractorOutType[];
  attachments: AttachmentOutType[];
};

export enum OrderStatusEnum {
  NEW = "NEW",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}
export type OrderFieldsNameType =
  | "title"
  | "totalSum"
  | "comment"
  | "description";

export type AddOrderFormData = {
  title: string;
  comment: string;
  totalSum: number;
  categories: CategoryInType[];
  contractors: ContractorInType[] | [];
  attachments: AttachmentInType[];
  customerId: number;
  description?: string;
};
export type DescriptionOrderFormData = {
  title: string;
  description?: string;
  comment: string;
  totalSum: number;
};

export type OrdersQueryFilterType = "active" | "deleted" | "archived" | null;
export type SortByOrdersFieldsType = "title" | "totalSum" | "creationDate";
