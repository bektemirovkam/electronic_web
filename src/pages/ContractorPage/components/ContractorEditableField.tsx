import { Form, Input, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import {
  EditableFieldPropsType,
  SupplierDescrFormDataType,
  SupplierFieldsNameType,
} from "../../../types";

const { Text } = Typography;

const ContractorEditableField: React.FC<
  EditableFieldPropsType<SupplierDescrFormDataType, SupplierFieldsNameType>
> = ({
  placeholder,
  editMode,
  fieldName,
  control,
  error,
  defaultValue,
  isTextArea = false,
  maxLength,
}) => {
  if (editMode) {
    return (
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Form.Item
            validateStatus={error ? "error" : "success"}
            help={error?.message}
            className="input"
          >
            {isTextArea ? (
              <Input.TextArea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            ) : (
              <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
              />
            )}
          </Form.Item>
        )}
        name={fieldName}
        defaultValue={defaultValue as string}
      />
    );
  }
  return <Text>{defaultValue}</Text>;
};

export default React.memo(ContractorEditableField);