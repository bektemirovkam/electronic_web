import { Form, Typography, Input } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  CustomerDescrFormDataType,
  SupplierDescrFormDataType,
  SupplierFieldsNameType,
} from "../../../models/Contractors";

type ContractorFieldPropsType = {
  subtitle: string;
  fieldName: SupplierFieldsNameType;
  required: boolean;
  maxLength?: number;
  control?: Control<
    SupplierDescrFormDataType | CustomerDescrFormDataType,
    object
  >;
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

export default ContractorField;
