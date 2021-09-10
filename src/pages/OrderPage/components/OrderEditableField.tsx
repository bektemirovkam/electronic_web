import { Form, Input, InputNumber, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import {
  DescriptionOrderFormData,
  EditableFieldPropsType,
} from "../../../types";

const { Text } = Typography;

type FieldsNameType = "title" | "totalSum" | "comment" | "description";

const OrderEditableField: React.FC<
  EditableFieldPropsType<DescriptionOrderFormData, FieldsNameType>
> = ({
  placeholder,
  editMode,
  fieldName,
  control,
  error,
  defaultValue,
  isTextArea = false,
  isNumberInput = false,
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
            ) : isNumberInput ? (
              <InputNumber
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            ) : (
              <Input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            )}
          </Form.Item>
        )}
        name={fieldName}
        defaultValue={defaultValue}
      />
    );
  }
  return <Text>{defaultValue}</Text>;
};

export default OrderEditableField;
