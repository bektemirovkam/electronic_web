import { AttachmentInType, AttachmentOutType } from "./Attachments";
import { CategoryInType, CategoryOutType } from "./Categories";

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

export type ContractorStringSortFieldsType =
  | "contractorType"
  | "name"
  | "location";

export type ContractorNumberSortFieldsType = "rating";

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

export type ContractorInType = {
  contractorId: number;
};

export type ContractorOutType = {
  contractorId: number;
  contractorName: string;
};

export type ContractorsQueryFilterType =
  | "customers"
  | "supplier"
  | "deleted"
  | null;

export type UserOutType = {
  id: number;
  phoneNumber: string;
  pushToken: string;
  secretToken: string;
  isBlocked: boolean;
};
export type UserInType = {
  phoneNumber: string;
  password?: string;
  smsCode: string;
  pushToken?: string;
};
export type UserCheckType = {
  phoneNumber: string;
  secretToken: string;
};
export type UserCredentialsType = {
  userName: string;
  secretToken: string;
};
