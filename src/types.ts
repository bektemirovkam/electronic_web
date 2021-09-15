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

export type ContractorFullInfoType = {
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
  categories: ContractorCategoryOutType[];
  photos: ContractorPhotoOutType[];
  rating: number;
};

export type AddContractorFormDataType = {
  name: string;
  contactName: string;
  phoneNumber: string;
  description: string;
  location: string;
  coordinates: CoordinatesType;
  contacts: ContactsType;
  contractorType: ContractorTypesEnum;
  categories: ContractorCategoryInType[];
  photos: ContractorPhotoInType[];
  rating: number;
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
export type ContractorCategoryInType = {
  // при добавлении категории контрагента
  categoryId: number;
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
  creationDate: string;
  actualDate: string;
  title: string;
  description: string;
  orderStatus: "NEW" | "ARCHIVED" | "DELETED";
  customerId: number;
  totalSum?: string;
  comment?: string;
};

export type OrderFullInfoType = {
  id: number;
  creationDate: number;
  actualDate: number;
  comment?: string;
  title: string;
  description?: string;
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
export type OrderFieldsNameType =
  | "title"
  | "totalSum"
  | "comment"
  | "description";

export type AddOrderFormData = {
  title: string;
  description?: string;
  comment: string;
  totalSum: number;
  orderStatus: "NEW" | "ARCHIVED" | "DELETED";
  categories: OrderCategoryInType[];
  contractors: OrderContractorInType[] | [];
  attachments: OrderAttachmentInType[];
  customerId: number;
};

export type DescriptionOrderFormData = {
  title: string;
  description?: string;
  comment: string;
  totalSum: number;
};

export type OrderCategoryInType = {
  // при добавлении категории в заявку
  categoryId: number;
};

export type OrderCategoryOutType = {
  // при получении категорий у заявки
  categoryId: number;
  categoryName: string;
  parentId: number;
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
