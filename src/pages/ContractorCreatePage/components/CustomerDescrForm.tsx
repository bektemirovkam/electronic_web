import React from "react";
import { Control, FieldError } from "react-hook-form";
import {
  CustomerDescrFormDataType,
  CustomerFieldsNameType,
} from "../../../models/Contractors";
import ContractorField from "./ContractorField";

const fields = [
  {
    id: "1",
    fieldName: "name",
    subtitle: "Название организации",
    required: true,
  },
  {
    id: "2",
    fieldName: "contactName",
    subtitle: "Контактное лицо",
    required: true,
  },
  { id: "3", fieldName: "location", subtitle: "Город", required: true },
  {
    id: "7",
    fieldName: "phoneNumber",
    subtitle: "Номер телефона для авторизации",
    maxLength: 12,
    required: true,
    defaultValue: "+7",
  },
];

type CustomerDescrFormPropsType = {
  control?: Control<CustomerDescrFormDataType, object>;
  errors: {
    name?: FieldError;
    phoneNumber?: FieldError;
    contactName?: FieldError;
    location?: FieldError;
  };
};

const CustomerDescrForm: React.FC<CustomerDescrFormPropsType> = ({
  control,
  errors,
}) => {
  return (
    <>
      {fields.map((field) => {
        return (
          <ContractorField
            key={field.id}
            control={control}
            error={errors[field.fieldName as CustomerFieldsNameType]}
            subtitle={field.subtitle}
            fieldName={field.fieldName as CustomerFieldsNameType}
            required={field.required}
            maxLength={field.maxLength}
            defaultValue={field.defaultValue}
          />
        );
      })}
    </>
  );
};

export default CustomerDescrForm;
