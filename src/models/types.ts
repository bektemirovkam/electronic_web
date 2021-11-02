import { Control, FieldError } from "react-hook-form";

export type StateSpecializationType = {
  [key: string]: {
    IDs: string[];
    names: string[] | [];
  };
};

export type ActionsCreatorsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export enum ActionStatusEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export type OtpFormDataType = {
  phoneNumber: string;
  otp: string;
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

export type Result = {
  id: number;
  error: string;
};

export type SaveContactsResponse = {
  contacts: { phoneNumber: string }[];
};
