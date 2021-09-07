import { Form, Input, Typography } from "antd";
import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { addOrderFormData } from "../../../types";

const { Text } = Typography;

type OrderEditableFieldPropsType = {
  editMode: boolean;
  fieldName: "title" | "price" | "deadline" | "description" | "customerId";
  control: Control<addOrderFormData, object>;
  error: FieldError | undefined;
  defaultValue?: string;
  isTextArea?: boolean;
  placeholder?: string;
};

const OrderEditableField: React.FC<OrderEditableFieldPropsType> = ({
  placeholder,
  editMode,
  fieldName,
  control,
  error,
  defaultValue,
  isTextArea = false,
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
