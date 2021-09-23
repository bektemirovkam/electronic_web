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

export type Result = {
  id: number;
  error: string;
};
