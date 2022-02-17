import React from "react";
import { Control, FieldError } from "react-hook-form";
import { AdminField } from ".";
import {
  AdminFieldsNameType,
  AdminFormDataType,
} from "../../../models/Administrator";

const fields = [
  {
    id: "1",
    fieldName: "phoneNumber",
    subtitle: "Номер телефона для авторизации",
    maxLength: 12,
    required: true,
    defaultValue: "+7",
  },
  { id: "2", fieldName: "password", subtitle: "Пароль", required: true },
  {
    id: "3",
    fieldName: "confirm",
    subtitle: "Повторите пароль",
    required: true,
  },
];

type AdminFormPropsType = {
  control?: Control<AdminFormDataType, object>;
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
            error={errors[field.fieldName as AdminFieldsNameType]}
            subtitle={field.subtitle}
            fieldName={field.fieldName as AdminFieldsNameType}
            required={field.required}
            maxLength={field.maxLength}
            defaultValue={field.defaultValue}
          />
        );
      })}
    </>
  );
};

export default AdminForm;
