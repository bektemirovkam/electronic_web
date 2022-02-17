export type AdministratorInType = {
  phoneNumber: string;
  password: string;
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
