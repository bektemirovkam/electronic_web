export type AdministratorInType = {
  phoneNumber: string;
  password: string;
  isBlocked: boolean;
};

export type AdministratorOutType = {
  id: number;
  phoneNumber: string;
  passwordHash: string;
  isBlocked: boolean;
};

export type AdministratorCredentialsType = {
  phoneNumber: string;
  password: string;
};

export type AdminFormDataType = {
  phoneNumber: string;
  password: string;
  confirm: string;
};

export type AdminFieldsNameType = "phoneNumber" | "password" | "confirm";
