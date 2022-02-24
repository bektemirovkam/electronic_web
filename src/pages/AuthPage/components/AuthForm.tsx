import React from "react";
import { Control, FieldError } from "react-hook-form";
import {
  AdminFieldsNameType,
  AdministratorCredentialsType,
} from "../../../models/Administrator";
import AuthField from "./AuthField";

const fields = [
  {
    id: "1",
    fieldName: "phoneNumber",
    subtitle: "Телефон",
    required: true,
    defaultValue: "+7",
  },
  {
    id: "2",
    fieldName: "password",
    subtitle: "Повторите пароль",
    required: true,
    password: true,
  },
];

type AuthFormPropsType = {
  control?: Control<AdministratorCredentialsType, object>;
  errors: {
    phoneNumber?: FieldError;
    password?: FieldError;
    confirm?: FieldError;
  };
};

const AuthForm: React.FC<AuthFormPropsType> = ({ control, errors }) => {
  return (
    <>
      {fields.map((field) => {
        return (
          <AuthField
            key={field.id}
            control={control}
            error={
              errors[field.fieldName as Exclude<AdminFieldsNameType, "confirm">]
            }
            subtitle={field.subtitle}
            fieldName={
              field.fieldName as Exclude<AdminFieldsNameType, "confirm">
            }
            required={field.required}
            password={field.password}
            defaultValue={field.defaultValue}
          />
        );
      })}
    </>
  );
};

export default AuthForm;
