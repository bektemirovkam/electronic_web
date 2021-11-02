import { Typography } from "antd";
import React from "react";
import { Control, FieldError } from "react-hook-form";
import {
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
  SupplierFieldsNameType,
} from "../../../models/Contractors";
import ContractorField from "./ContractorField";

const { Text } = Typography;

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
  { id: "4", fieldName: "address", subtitle: "Адрес", required: true },
  { id: "5", fieldName: "eMail", subtitle: "Почта", required: false },
  { id: "6", fieldName: "webSite", subtitle: "Сайт компании", required: false },
  {
    id: "7",
    fieldName: "phoneNumber",
    subtitle: "Номер телефона для авторизации",
    maxLength: 12,
    required: true,
    defaultValue: "+7",
  },
  {
    id: "8",
    fieldName: "description",
    subtitle: "Описание",
    required: false,
    textArea: true,
  },
];

type SupplierDescrFormPropsType = {
  control?: Control<
    SupplierDescrFormDataType | CustomerDescrFormDataType,
    object
  >;
  errors: {
    name?: FieldError;
    phoneNumber?: FieldError;
    contactName?: FieldError;
    location?: FieldError;
    webSite?: FieldError;
    eMail?: FieldError;
    address?: FieldError;
    description?: FieldError;
  };
};

const SupplierDescrForm: React.FC<SupplierDescrFormPropsType> = ({
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
            error={errors[field.fieldName as SupplierFieldsNameType]}
            subtitle={field.subtitle}
            fieldName={field.fieldName as SupplierFieldsNameType}
            required={field.required}
            maxLength={field.maxLength}
            textArea={field.textArea}
            defaultValue={field.defaultValue}
          />
        );
      })}
    </>
  );
};

export default SupplierDescrForm;
