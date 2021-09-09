import { Control, FieldError } from "react-hook-form";

export type CategoryType = {
  id: number;
  name: string;
  isDeleted: boolean;
  parentId: number;
};

export type AddCategoryFormData = {
  name: string;
  parentId: number;
};

export type CoordinatesType = {
  coordinatesLatitude: string;
  coordinatesLongitude: string;
};

export type ContactsType = {
  address?: string;
  webSite?: string;
  eMail?: string;
};

export enum ContractorTypesEnum {
  UNKNOWN = "UNKNOWN",
  SUPPLIER = "SUPPLIER",
  CUSTOMER = "CUSTOMER",
}

export enum ContractorStatusEnum {
  NEW = "NEW",
  REGISTERED = "REGISTERED",
  BANNED = "BANNED",
}

export type CustomerFormDataType = {
  name: string;
  phoneNumber: string;
  description: string;
  location: string;
  webSite: string;
  eMail: string;
  address: string;
};

export type SupplierFormDataType = {
  name: string;
  location: string;
  description: string;
  webSite?: string;
  eMail?: string;
  address?: string;
  phoneNumber?: string;
};

export type ContractorType = {
  id: number;
  isDeleted: boolean;
  name: string;
  phoneNumber: string;
  description: string;
  location: string;
  coordinates: CoordinatesType;
  contacts: ContactsType;
  contractorType: ContractorTypesEnum;
  contractorStatus: ContractorStatusEnum;
};

export type ContractorCategoryInType = {
  // при добавлении категории контрагента
  categoryId: number;
};

export type ContractorCategoryOutType = {
  // при получении категорий контрагента
  categoryId: number;
  categoryName: string;
};

export type ContractorPhotoInType = {
  // при добавлении фото контрагента
  name: string;
  photo: string;
};

export type ContractorPhotoOutType = {
  // при получении фото контрагента
  id: number;
  name: string;
  photo: string;
};

export type StateSpecializationType = {
  [key: string]: {
    IDs: string[];
    names: string[] | [];
  };
};

export type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type OrderType = {
  id: number;
  number: string;
  creationDate: string;
  actualDate: string;
  title: string;
  description: string;
  orderStatus: "NEW" | "ARCHIVED" | "DELETED";
  customerId: number;
  price?: string;
  deadline?: string;
};

export type OrderFullInfoType = {
  id: number;
  creationDate: number;
  actualDate: number;
  deadline?: string;
  title: string;
  description: string;
  totalSum: number;
  orderStatus: "NEW" | "ARCHIVED" | "DELETED";
  customerId: number;
  categories: OrderCategoryOutType[];
  contractors: OrderContractorOutType[];
  attachments: OrderAttachmentOutType[];
};

export enum OrderStatusEnum {
  NEW = "NEW",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export type AddOrderFormData = {
  title: string;
  price: string;
  deadline: string;
  description: string;
  customerId?: number;
};

export type OrderCategoryInType = {
  // при добавлении категории в заявку
  categoryId: number;
};

export type OrderCategoryOutType = {
  // при получении категорий у заявки
  categoryId: number;
  categoryName: string;
};

export type OrderContractorInType = {
  // при добавлении или удалении контрагента в заявку
  contractorId: number;
};

export type OrderContractorOutType = {
  // при получении всех контрагентов у заявки
  contractorId: number;
  contractorName: string;
};

export type OrderAttachmentInType = {
  // при добавлении вложения в заявку
  attachmentName: string;
  attachment: string;
};

export type OrderAttachmentOutType = {
  // при получении вложений в заявке
  attachmentId: number;
  attachmentName: string;
  attachment: string;
};

export enum ActionStatusEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export type OtpFormDataType = {
  phoneNumber: string;
  otp: string;
};

export type OrdersQueryFilterType = "active" | "deleted" | "archived" | null;
export type SortByOrdersFieldsType = "title" | "price" | "creationDate";
export type DirectionType = "asc" | "desc";

export type getComparatorType<T, D, S> = {
  (direction: D, sortBy: S): ComparatorType<T>;
};

export type ComparatorType<T> = {
  (a: T, b: T): number;
};

export type stableSortType<T> = {
  (array: T[], comparator: ComparatorType<T>): T[];
};

export type descendingComparatorType<T, S> = {
  (a: T, b: T, sortBy: S): number;
};

export type EditableFieldPropsType<T, F> = {
  editMode: boolean;
  fieldName: F;
  control: Control<T, object>;
  error: FieldError | undefined;
  defaultValue?: string;
  isTextArea?: boolean;
  placeholder?: string;
  currentValue?: string;
};

export type MessageType = {
  id: string;
  from: string;
  to: string;
  text: string;
};

export type ChatType = {
  id: string;
  lastMessage: string;
  messages: MessageType[];
  name: string;
};
