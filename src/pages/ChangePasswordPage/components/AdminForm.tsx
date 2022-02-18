import React from "react";
import { Control, FieldError } from "react-hook-form";
import { AdminField } from ".";
import {
  ChangePasswordFieldsNameType,
  ChangePasswordFormDataType,
} from "../../../models/Administrator";

const fields = [
  {
    id: "1",
    fieldName: "password",
    subtitle: "Новый пароль",
    required: true,
    password: true,
  },
  {
    id: "2",
    fieldName: "confirm",
    subtitle: "Повторите пароль",
    required: true,
    password: true,
  },
];

type AdminFormPropsType = {
  control?: Control<ChangePasswordFormDataType, object>;
  errors: {
    phoneNumber?: FieldError;
    password?: FieldError;
    confirm?: FieldError;
  };
};

const AdminForm: React.FC<AdminFormPropsType> = ({ control, errors }) => {
  return (
    <>
      {fields.map((field) => {
        return (
          <AdminField
            key={field.id}
            control={control}
            error={errors[field.fieldName as ChangePasswordFieldsNameType]}
            subtitle={field.subtitle}
            fieldName={field.fieldName as ChangePasswordFieldsNameType}
            required={field.required}
            password={field.password}
          />
        );
      })}
    </>
  );
};

export default AdminForm;
