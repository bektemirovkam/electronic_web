import { Form, Typography, Input } from "antd";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  AdminFieldsNameType,
  AdminFormDataType,
} from "../../../models/Administrator";

type AdminFieldPropsType = {
  subtitle: string;
  fieldName: AdminFieldsNameType;
  required: boolean;
  maxLength?: number;
  control?: Control<AdminFormDataType, object>;
  error?: FieldError;
  password?: boolean;
  defaultValue?: string;
};

const { Text } = Typography;

const AdminField: React.FC<AdminFieldPropsType> = ({
  control,
  error,
  subtitle,
  fieldName,
  required = true,
  maxLength,
  password,
  defaultValue,
}) => {
  const InputField = password ? Input.Password : Input;

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

export default AdminField;
