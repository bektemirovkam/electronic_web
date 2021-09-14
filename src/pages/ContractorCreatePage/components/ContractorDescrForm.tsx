import { Form, Input, Typography } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  SupplierDescrFormDataType,
  SupplierFieldsNameType,
} from "../../../types";

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
    subtitle: "Номер телефона",
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

type ContractorFieldPropsType = {
  subtitle: string;
  fieldName: SupplierFieldsNameType;
  required: boolean;
  maxLength?: number;
  control?: Control<SupplierDescrFormDataType, object>;
  error?: FieldError;
  textArea?: boolean;
  defaultValue?: string;
};

const { Text } = Typography;

const ContractorField: React.FC<ContractorFieldPropsType> = ({
  control,
  error,
  subtitle,
  fieldName,
  required = true,
  maxLength,
  textArea,
  defaultValue,
}) => {
  const InputField = textArea ? Input.TextArea : Input;

  return (
    <Controller
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <Form.Item
          validateStatus={error ? "error" : "success"}
          help={error?.message}
          className="input form__input"
          required={required}
        >
          <Text className="subtitle">{subtitle}</Text>
          <InputField
            placeholder={subtitle}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
          />
        </Form.Item>
      )}
      name={fieldName}
      defaultValue={defaultValue}
    />
  );
};

type ContractorDescrFormPropsType = {
  control?: Control<SupplierDescrFormDataType, object>;
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

const ContractorDescrForm: React.FC<ContractorDescrFormPropsType> = ({
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

export default ContractorDescrForm;
