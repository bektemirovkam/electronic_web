import { Form, Input, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import {
  CustomerDescrFormDataType,
  CustomerFieldsNameType,
  SupplierDescrFormDataType,
  SupplierFieldsNameType,
} from "../../../models/Contractors";
import { EditableFieldPropsType } from "../../../models/types";
import { truncateString } from "../../../utils/formatter";

const { Text } = Typography;

const ContractorEditableField: React.FC<
  EditableFieldPropsType<
    SupplierDescrFormDataType | CustomerDescrFormDataType,
    SupplierFieldsNameType | CustomerFieldsNameType
  >
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
  if (fieldName === "eMail") {
    return <a href={`mailto:${defaultValue}`}>{defaultValue}</a>;
  }
  if (fieldName === "webSite" && defaultValue) {
    return (
      <a href={defaultValue as string} target="_blank" rel="noreferrer">
        {truncateString(defaultValue as string, 25)}
      </a>
    );
  }
  return <Text>{defaultValue}</Text>;
};

export default React.memo(ContractorEditableField);
