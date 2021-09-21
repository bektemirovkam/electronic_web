import { Control, FieldError } from "react-hook-form";
import { AttachmentInType, AttachmentOutType } from "./models/Attachments";

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

export type ContractorType = {
  id: number;
  isDeleted: boolean;
  name: string;
  contactName: string;
  phoneNumber: string;
  description: string;
  location: string;
  coordinates: CoordinatesType;
  contacts: ContactsType;
  contractorType: ContractorTypesEnum;
  categories: CategoryOutType[];
  attachments: AttachmentOutType[];
  rating: number;
};

export type AddContractorFormDataType = {
  name: string;
  contactName: string;
  phoneNumber: string;
  description?: string;
  location: string;
  coordinates: CoordinatesType;
  contacts: ContactsType;
  contractorType: ContractorTypesEnum;
  categories: CategoryInType[];
  attachments: AttachmentInType[];
};

export type SupplierDescrFormDataType = {
  name: string;
  phoneNumber: string;
  contactName: string;
  location: string;
  webSite: string;
  eMail: string;
  address: string;
  description?: string;
};
export type CustomerDescrFormDataType = {
  name: string;
  phoneNumber: string;
  contactName: string;
  location: string;
};

export type SupplierFieldsNameType =
  | "name"
  | "phoneNumber"
  | "contactName"
  | "location"
  | "webSite"
  | "eMail"
  | "address"
  | "description";
export type CustomerFieldsNameType =
  | "name"
  | "phoneNumber"
  | "contactName"
  | "location";

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
  creationDate: number;
  actualDate: number;
  comment?: string;
  title: string;
  description?: string;
  totalSum: number;
  orderStatus: "NEW" | "ARCHIVED" | "DELETED";
  customerId: number;
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

export type CategoryInType = {
  categoryId: number;
};

export type CategoryOutType = {
  categoryId: number;
  categoryName: string;
  parentId: number;
};

export type ContractorInType = {
  contractorId: number;
};

export type ContractorOutType = {
  contractorId: number;
  contractorName: string;
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
export type ContractorsQueryFilterType =
  | "customers"
  | "supplier"
  | "deleted"
  | null;
export type SortByOrdersFieldsType = "title" | "totalSum" | "creationDate";
export type DirectionType = "asc" | "desc";

export type GetComparatorType<T, D, S> = {
  (direction: D, sortBy: S): ComparatorType<T>;
};

export type ComparatorType<T> = {
  (a: T, b: T): number;
};

export type StableSortType<T> = {
  (array: T[], comparator: ComparatorType<T>): T[];
};

export type DescendingComparatorType<T, S> = {
  (a: T, b: T, sortBy: S): number;
};

export type EditableFieldPropsType<T, F> = {
  editMode: boolean;
  fieldName: F;
  control: Control<T, object>;
  error?: FieldError;
  defaultValue?: string | number;
  isTextArea?: boolean;
  isNumberInput?: boolean;
  placeholder?: string;
  currentValue?: string;
  maxLength?: number;
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
